import mongoose from 'mongoose';

const mongoUri: string = process.env.MONGODB_URI || 'mongodb://localhost/booksapi';

mongoose.connect(mongoUri);

export default mongoose.connection;
