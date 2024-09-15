import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IBook extends Document {
    title: string,
    description: string,
    year: number,
    quantity: number,
    image: string
}

const bookSchema: Schema<IBook> = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: '' },
    year: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    image: { type: String, default: 'https://picsum.photos/350/350' },
});

const Book: Model<IBook> = mongoose.model<IBook>('Book', bookSchema);

export default Book;
