import {
    Publisher,
    Subjects,
    TicketUpdatedEvent,
} from '@rochmadtickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}