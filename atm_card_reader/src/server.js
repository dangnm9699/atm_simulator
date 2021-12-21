import express from 'express'
import http from 'http'
import env from 'dotenv'
import initApp from './config/initApp.mjs'
import initRoutes from './routes/web.mjs'


env.config()
const app = express()
initApp(app)
initRoutes(app)

const server = http.createServer(app)
server.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server is listening with port ${process.env.PORT}...`);
})
