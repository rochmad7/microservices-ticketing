import mongoose from 'mongoose';

interface PaymentAttributes {
    orderId: string;
    stripeId: string;
}

interface PaymentDoc extends mongoose.Document {
    orderId: string;
    stripeId: string;
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
    build(attributes: PaymentAttributes): PaymentDoc;
}

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            required: true,
        },
        stripeId: {
            type: String,
            required: true,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            },
        },
    }
);

paymentSchema.statics.build = (attributes: PaymentAttributes) => {
    return new Payment(attributes);
};

const Payment = mongoose.model<PaymentDoc, PaymentModel>(
    'Payment',
    paymentSchema
);

export { Payment };
