import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test',
        })
        .expect(201);
});

it('returns a 400 on invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'testest.com',
            password: 'test',
        })
        .expect(400);
});

it('returns a 400 on invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@est.com',
            password: 'te',
        })
        .expect(400);
});

it('returns a 400 on missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ email: 'bcdjhiad@abdhcjl.com' })
        .expect(400);
    await request(app)
        .post('/api/users/signup')
        .send({ password: 'wcojw' })
        .expect(400);
});

it('disallows duplicate email addresses', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test',
        })
        .expect(201);
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test',
        })
        .expect(400);
});

it('sets a cookie after signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'test',
        })
        .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});