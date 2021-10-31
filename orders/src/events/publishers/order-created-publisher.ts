import { OrderCreatedEvent, Publisher, Subjects } from '@rochmadtickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}