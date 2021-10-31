import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
    function signin(id?: string): string;
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
    'sk_test_51JgU1EGp7jMP9WEx1tkfvKeGRhXAgp0A16mMfI3e9dYf8g5ozpK4rqjimrs7I6Z8LXySGwz6p9AGVt0qRkdRYeI600NDs5kYa5';

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'qwerty';
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.signin = (id?: string) => {
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'jfsvh@gmail.com',
    };

    const token = jwt.sign(payload, process.env.JWT_KEY!);

    const session = {
        jwt: token,
    };

    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64');

    return `express:sess=${base64}`;
};
