import express from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { log } from './utils/logger'
var bodyParser = require('body-parser')

import router from "./routes/zoot.routes";
// import { seedDatabase } from "./db/data-seeding";
import { ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants';

interface ServerOptions {
    port: number;
    apiPrefix: string;
}

export class Server {
    private readonly app = express();
    private readonly port: number;

    constructor(options: ServerOptions) {
        const { port } = options;
        this.port = port;
        this.initializeRoutes()
        // this.seedDB()F
    }

    private seedDB() {
        // seedDatabase().catch((error) => log(error));
    }
    private initializeRoutes() {
        this.app.use(bodyParser.json());
        this.app.use(router)
    }

    async start(): Promise<void> {
        //* Middlewares
        this.app.use(express.json()); // parse json in request body (allow raw)
        this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
        this.app.use(compression());

        //  limit repeated requests to public APIs
        this.app.use(
            rateLimit({
                max: ONE_HUNDRED,
                windowMs: SIXTY * SIXTY * ONE_THOUSAND,
                message: 'Too many requests from this IP, please try again in one hour'
            })
        );


        this.app.listen(this.port, () => {
            log(`Server running on http://localhost:${this.port}`);
        });
    }
}