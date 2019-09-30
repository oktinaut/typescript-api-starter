import "reflect-metadata"

import * as path from "path"

import * as bodyParser from "body-parser"
import * as express from "express"
import * as morgan from "morgan"
import * as ora from "ora"
import * as swaggerUI from "swagger-ui-express"
import { createConnection, Connection } from "typeorm"

import { iocContainer } from "./iocContainer"
import { RegisterRoutes } from "../generated/Routes/routes"

import * as swaggerDocument from "../generated/Swagger/swagger.json"

async function connectToDatabase() {
    
    const spinner = ora("Connection to database")

    let connection = await createConnection({
        type: "sqlite",
        entities: [
            path.join(__dirname, "Features/**/ORM/*.js"),
        ],
        synchronize: true,
        database: "db.sqlite",
        logging: false,
    })

    iocContainer.bind<Connection>("Connection").toConstantValue(connection)

    spinner.text = "Connected to database"
    spinner.succeed()
}

async function start() {

    await connectToDatabase()

    let app = express()

    app.use(bodyParser.json())
    app.use(morgan("combined"))
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    
    RegisterRoutes(app)
    
    const host = "localhost"
    const port = 3000
    
    const spinner = ora("Staring server").start()

    app.listen(port, host, () => {
        spinner.text = `Server listening on '${host}:${port}'`
        spinner.succeed()
        console.log()
    })
}

try {
    start()
} catch (error) {
    console.log("", error)
}