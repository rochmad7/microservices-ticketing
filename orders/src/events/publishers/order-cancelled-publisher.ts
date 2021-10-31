import {
    OrderCancelledEvent,
    Publisher,
    Subjects,
} from '@rochmadtickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}