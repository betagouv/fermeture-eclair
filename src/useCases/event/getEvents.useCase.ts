import { DataSource } from 'typeorm';
import { buildEventRepository } from '../../repositories';

export { buildGetEvents };

function buildGetEvents(dataSource: DataSource) {
    const eventRepository = buildEventRepository(dataSource);

    return getEvents;

    async function getEvents() {
        return eventRepository.getAll();
    }
}
