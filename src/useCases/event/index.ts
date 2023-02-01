import { dataSource } from '../../dataSource';
import { buildCreateEvent } from './createEvent.useCase';

export { eventUseCases };

const createEvent = buildCreateEvent(dataSource);

const eventUseCases = { createEvent };
