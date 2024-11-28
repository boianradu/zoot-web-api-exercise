import { envs } from './core/config/env';
import { Server } from './server';
import { log } from './utils/logger';

(() => {
    main();
})();

function main(): void {
    const server = new Server({
        port: envs.PORT,
        apiPrefix: envs.API_PREFIX
    });
    void server.start();
}