import React, { useState } from "react";
// import PromptInput from "./components/PromptInput";
import { ResponseDisplay, PDFTextExtractor, PromptInput, RoleInput } from "./components/Analyzer";
// import RoleInput from "./components/RoleInput";
// import ResponseDisplay from "./components/ResponseDisplay";
// import PDFTextExtractor from "./components/PDFTextExtractor";
import { analyzeResume } from "./api/ServerAPI";
import { generatePDFReport } from "./utils/reportGenerator";

function App() {
  const [prompt, setPrompt] = useState("");
  const [role, setRole] = useState("");
  const [response, setResponse] = useState({});
  const [username, setUsername] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleTextExtraction = (extractedText) => {
    setPrompt((prevPrompt) => prevPrompt + "\n" + extractedText);
  };

  const handleSubmit = async () => {
    if (!prompt.trim() || !role.trim()) {
      setResponse({ analysis: "Prompt and role cannot be empty!", score: 0 });
      return;
    }

    try {
      const apiResponse = await analyzeResume(prompt, role, username, contactNo);
      setResponse(apiResponse);
    } catch (error) {
      setResponse({ analysis: "Error occurred while analyzing resume.", score: 0 });
    }
  };

  const handleDownloadReport = () => {
    if (response.analysis) {
      generatePDFReport(prompt, role, response, username, contactNo);
    } else {
      alert("No analysis to download. Please submit the resume for analysis first.");
    }
  };

  return (
    <div className="App bg-gradient-to-r from-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center pt-12 pb-12 transition-colors duration-300">
      <div className="container mx-auto p-12 bg-white dark:bg-gray-800 shadow-xl rounded-xl max-w-5xl">
        <header className="App-header text-center mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-300">Resume Analysis</h1>
            <button
              onClick={toggleDarkMode}
              className="text-3xl text-indigo-600 dark:text-white transition-transform transform hover:scale-105"
            >
              {darkMode ? (
                <i className="fas fa-sun"></i> // Sun icon for light mode
              ) : (
                <i className="fas fa-moon"></i> // Moon icon for dark mode
              )}
            </button>
          </div>

          <div className="mb-8 space-y-6">
            {/* <PromptInput prompt={prompt} onChange={setPrompt} /> */}
            <RoleInput role={role} onChange={setRole} />
          </div>

          <div className="space-x-6">
            <button
              onClick={handleSubmit}
              className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl shadow-xl transform transition-all hover:scale-110 hover:bg-indigo-700"
            >
              Submit
            </button>

            <button
              onClick={handleDownloadReport}
              className="px-8 py-4 bg-green-600 text-white font-semibold rounded-xl shadow-xl transform transition-all hover:scale-110 hover:bg-green-700"
            >
              Download Report
            </button>
          </div>
        </header>

        <div className="mt-10">
          <ResponseDisplay response={response} candidateName={username} />
        </div>

        <div className="mt-12">
          <PDFTextExtractor onTextExtract={handleTextExtraction} />
        </div>
      </div>
    </div>
  );
}

export default App;
