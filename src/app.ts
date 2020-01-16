import express, { RequestHandler } from 'express'
import path from 'path'
import fs from 'fs'

import bodyParser from 'body-parser'
import * as errorHandler from './middlewares/errorHandler'
import logger from './middlewares/logger'
import ignoreFavicon from './middlewares/ignoreFavicon'

const app = express()

const configPath = path.join(process.cwd(), '.quickly.js')
const defaultConfig = require('./defaultConfig')
let config = defaultConfig
if (fs.existsSync(configPath)) {
    const userConfig = require(configPath)
    config = Object.assign(defaultConfig, userConfig)
} else {
    const content = fs.readFileSync(path.join(__dirname, 'defaultConfig.js')).toString()
    fs.writeFileSync(configPath, content)
}

// Ignore favicon
app.use(ignoreFavicon())

// Parse Params
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Logger
app.use(logger())

// External middleware
try {
    if (config.middlewares && Array.isArray(config.middlewares)) {
        for (let i = 0; i < config.middlewares.length; i++) {
            app.use(config.middlewares[i])
        }
    }
} catch (e) {
    console.log('Error in external middlewares in .quickly.js')
}

// Router
const router = require(path.join(process.cwd(), config.routerPath))
app.use(config.apiPrefix, router)

// Error Handler
app.use(errorHandler.notFoundErrorHandler())
app.use(errorHandler.errorHandler())

app.listen(config.port, () => {
    console.log(`server is starting on port http://localhost:${config.port}`)
})