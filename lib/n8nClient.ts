import axios from 'axios';

export const callN8nAI = async (resume: string, jobDescription: string) => {
  const response = await axios.post(process.env.N8N_WEBHOOK_URL!, {
    resume,
    jobDescription,
  });

  return response.data.tailoredResume;
};
