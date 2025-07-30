'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ResumeForm() {
  const [resume, setResume] = useState('');
  const [job, setJob] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume || !job) return alert('Please fill both fields.');
    setLoading(true);
    try {
      const res = await axios.post('/api/resume', { resume, job });
      setOutput(res.data.tailored);
    } catch (err) {
      alert('Error tailoring resume');
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      {/* Resume Input */}
      <textarea
        className="w-full p-3 rounded-md bg-[#1a1f2e] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        rows={6}
        placeholder="Paste your resume..."
        value={resume}
        onChange={(e) => setResume(e.target.value)}
      />

      {/* Job Description */}
      <textarea
        className="w-full p-3 rounded-md bg-[#1a1f2e] text-gray-200 border border-gray-700 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        rows={4}
        placeholder="Paste the job description..."
        value={job}
        onChange={(e) => setJob(e.target.value)}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 rounded-md font-semibold transition-all duration-300 bg-yellow-400 text-black hover:bg-yellow-300 disabled:opacity-50 cursor-pointer"
      >
        {loading ? 'Processing...' : '✨ Tailor My Resume'}
      </button>

      {/* Output Section */}
      {output && (
        <div className="mt-6 p-4 rounded-md bg-[#121624] border border-gray-700">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">🎉 Tailored Resume:</h3>
          <pre className="text-gray-300 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
