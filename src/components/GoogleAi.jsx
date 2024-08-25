import React, { useState } from 'react';
import axios from 'axios';

const GoogleAi = () => {
    const [prompt, setPrompt] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/generate', { prompt });
            setCandidates(response.data.candidates);
            setError('');
        } catch (err) {
            setError('An error occurred while generating content.');
            setCandidates([]);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-[#42b2a6] min-h-screen">
        <div className="w-full max-w-4xl bg-[#6bc4a8] p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">NGS GENERATIVE AI</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here..."
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSubmit}
                className="mt-4 px-6 py-2 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-black focus:outline-none focus:ring-2"
            >
                Generate
            </button>
            {candidates.length > 0 ? (
                <ul className="mt-6 space-y-4">
                    {candidates.map((candidate, index) => (
                        <li key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-md shadow-sm">
                            <h4 className="whitespace-pre-wrap">
                                <strong>Here the Results for your Prompt <br></br> {index + 1}:</strong>
                                <h3> {candidate.content.parts[0].text} </h3>
                            </h4>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="mt-4 text-gray-600">No content generated yet.</p>
            )}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    </div>
    );
};

export default GoogleAi;
