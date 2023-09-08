import { DataSource } from 'typeorm';
import { buildEventService } from './event.service';

function buildEventController(dataSource: DataSource) {
    const eventService = buildEventService(dataSource);

    return {
        getAllEvents,
    };

    function getAllEvents() {
        return eventService.getAll();
    }
}

export { buildEventController };
