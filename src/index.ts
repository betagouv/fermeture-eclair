import { buildApp } from './app';
import { config } from './config';

async function runApp() {
    const app = buildApp();

    app.listen(config.SERVER_PORT, () => {
        console.log(`Server is running at http://localhost:${config.SERVER_PORT}`);
    });
}

runApp();
