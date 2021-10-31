import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import {natsWrapper} from "../../nats-wrapper";

it('has a route handler listening to /api/tickets for post request', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is logged in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401);
});

it('returns a success if the user is logged in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({});

    expect(response.status).not.toEqual(401);
});

it('returns an error if an invalid title is passed', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10,
        })
        .expect(400);
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            price: 10,
        })
        .expect(400);
});

it('returns an error if an invalid price is passed', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'rrrrrrrrr',
            price: -10,
        })
        .expect(400);
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'dnjsr',
        })
        .expect(400);
});

it('returns a ticket with the correct input', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'bsajDH';

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price: 100,
        })
        .expect(201);

    tickets = await Ticket.find({});

    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(100);
    expect(tickets[0].title).toEqual(title);
});

it('publishes an event', async () => {
    const title = 'bsajDH';

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title,
            price: 100,
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
});