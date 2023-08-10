import { DataSource } from 'typeorm';
import { buildEventRepository } from '../../repositories';

export { buildCreateEvent };

function buildCreateEvent(dataSource: DataSource) {
    const eventRepository = buildEventRepository(dataSource);

    return createEvent;

    async function createEvent(payload: string) {
        return eventRepository.insertOne(payload);
    }
}
