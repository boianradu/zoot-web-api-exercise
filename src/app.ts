import { envs } from './core/config/env';
import { Server } from './server';
import { log } from './utils/logger';

(() => {
    main();
})();

function main(): void {
    log("Starting ZOOOOOOOT")
    const server = new Server({
        port: envs.PORT,
        apiPrefix: ""// empty string means no prefix
    });
    void server.start();
}