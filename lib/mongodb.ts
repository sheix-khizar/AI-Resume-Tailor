import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(MONGODB_URI);
};

export const ResumeSchema = new mongoose.Schema({
  email: String,
  original: String,
  tailored: String,
});

export const Resume = mongoose.models.Resume || mongoose.model('Resume', ResumeSchema);
