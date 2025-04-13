import mongoose from 'mongoose';

const connectDB = async (MONGO_URI) => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.log('Database connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
