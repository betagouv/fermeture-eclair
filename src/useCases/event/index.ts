import { dataSource } from '../../dataSource';
import { buildCreateEvent } from './createEvent.useCase';
import { buildGetEvents } from './getEvents.useCase';

export { eventUseCases };

const createEvent = buildCreateEvent(dataSource);
const getEvents = buildGetEvents(dataSource);

const eventUseCases = { createEvent, getEvents };
