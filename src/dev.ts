import path from 'path'
import { spawn } from 'child_process'

export default function () {
    spawn("npx", ["nodemon", "node", path.join(__dirname, 'app.js')], { stdio: 'inherit' })
}
