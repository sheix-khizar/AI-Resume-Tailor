import { NextResponse } from 'next/server';
import { connectDB, Resume } from '@/lib/mongodb';

export async function POST(req: Request) {
  const { resume, job } = await req.json();
  await connectDB();

  // Save resume without AI processing
  await Resume.create({
    email: 'test@example.com', // TODO: Replace with actual user email from auth
    original: resume,
    tailored: null, // No AI tailoring
    jobDescription: job, // Optional: store job description too
  });

  return NextResponse.json({ message: 'Resume saved successfully!' });
}
