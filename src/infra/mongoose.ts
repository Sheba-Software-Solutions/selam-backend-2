import mongoose from 'mongoose';

const MONGO_URI = process.env.DATABASE_URL || '';

export const connectMongo = async () => {
  if (!MONGO_URI) throw new Error('Missing DATABASE_URL');
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');
};

export default mongoose;
