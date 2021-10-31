import {
    PaymentCreatedEvent,
    Publisher,
    Subjects,
} from '@rochmadtickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

}