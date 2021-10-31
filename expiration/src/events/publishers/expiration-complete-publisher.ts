import {
    ExpirationCompleteEvent,
    Publisher,
    Subjects,
} from '@rochmadtickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
