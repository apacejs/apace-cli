import express, { Application } from 'express'
import path from 'path'
import fs from 'fs'

import bodyParser from 'body-parser'
import * as errorHandler from './middlewares/errorHandler'
import logger from './middlewares/logger'
import ignoreFavicon from './middlewares/ignoreFavicon'

const defaultConfig = require('./defaultConfig')

interface IConfig {
    port: number;
    apiPrefix: string;
    routerPath: string;
    [key: string]: any;
}

export default class Dev {
    app: Application;
    config: IConfig;

    constructor() {
        this.app = express()
        this.config = this.initConfig()
        this.loadMiddleware()
    }

    initConfig() {
        const configPath = path.join(process.cwd(), '.quickly.js')

        let config = defaultConfig
        if (fs.existsSync(configPath)) {
            const userConfig = require(configPath)
            config = Object.assign(defaultConfig, userConfig)
        } else {
            const content = fs.readFileSync(path.join(__dirname, 'defaultConfig.js')).toString()
            fs.writeFileSync(configPath, content)
        }

        return config
    }

    loadMiddleware() {
        this.app.use(ignoreFavicon())

        // Parse Params
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))

        // Logger
        this.app.use(logger())

        const router = require(path.join(process.cwd(), this.config.routerPath))
        this.app.use(this.config.apiPrefix, router)

        // Error Handler
        this.app.use(errorHandler.notFoundErrorHandler())
        this.app.use(errorHandler.errorHandler())
    }

    start() {
        this.app.listen(this.config.port, () => {
            console.log(`server is starting on port ${this.config.port}`)
        })
    }
}