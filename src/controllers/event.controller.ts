import { eventUseCases } from '../useCases/event';

const eventController = {
    getEvents: eventUseCases.getEvents,
};

export { eventController };
