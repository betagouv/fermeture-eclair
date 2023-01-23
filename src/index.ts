import { buildApp } from './app';
import { config } from './config';
import { dataSource } from './dataSource';

async function runApp() {
    try {
        await dataSource.initialize();
        await dataSource.runMigrations();
    } catch (error) {
        console.error(error);
    }

    const app = buildApp();

    app.listen(config.SERVER_PORT, () => {
        console.log(`Server is running at http://localhost:${config.SERVER_PORT}`);
    });
}

runApp();
