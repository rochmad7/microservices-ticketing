import {
    Publisher,
    Subjects,
    TicketCreatedEvent,
} from '@rochmadtickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}