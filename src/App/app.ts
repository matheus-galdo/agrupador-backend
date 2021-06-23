import express, { Application } from 'express'
import "reflect-metadata"
import '../database'
import { routes } from '../routes'

const middlewares = [
    express.json,
]

function attachMiddlewares(app: Application, middlewares: Array<any>): express.Application {
    middlewares.forEach(middleware => app.use(middleware()))
    return app
}

function attachRoutes(app: Application): express.Application {
    app.use(routes)
    return app
}

/**
 * Create a express instance
 * @returns Application
 */
function createServer(): express.Application {
    let app: Application = express()

    app = attachMiddlewares(app, middlewares)
    app = attachRoutes(app)

    return app
}


export { createServer }











