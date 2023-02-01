import { DataSource } from 'typeorm';
import { Event } from '../models';

export { buildEventRepository };

function buildEventRepository(dataSource: DataSource) {
    const repository = dataSource.getRepository(Event);

    return { insertOne };

    async function insertOne(payload: string): Promise<boolean> {
        const result = await repository.insert({ payload });
        return result.identifiers.length == 1;
    }
}
