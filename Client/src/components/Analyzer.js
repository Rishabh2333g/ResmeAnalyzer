import React, { useState } from "react";
import pdfToText from "react-pdftotext";
import { marked } from "marked";

function PDFTextExtractor({ onTextExtract }) {
  const [texts, setTexts] = useState("");
  const [feedback, setFeedback] = useState("");

  const MAX_FILE_SIZE_MB = 5;

  const extractText = (file, index) => {
    pdfToText(file)
      .then((extractedText) => {
        const formattedText = `[resume ${index + 1}]\n${extractedText}\n[end of resume ${index + 1}]`;
        setTexts((prevTexts) => prevTexts + "\n" + formattedText);
        setFeedback("Text extracted successfully!");
        onTextExtract(formattedText);
      })
      .catch((error) => {
        console.error("Failed to extract text from PDF", error);
        setFeedback("Failed to extract text from PDF. Please try again.");
      });
  };

  const validateAndProcessFile = (file, index) => {
    if (!file) {
      setFeedback("No file selected. Please upload a PDF.");
      return;
    }
    if (file.type !== "application/pdf") {
      setFeedback("Invalid file type. Only PDF files are allowed.");
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFeedback(`File size exceeds ${MAX_FILE_SIZE_MB} MB. Please upload a smaller file.`);
      return;
    }

    setFeedback("Processing file...");
    extractText(file, index);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file, index) => validateAndProcessFile(file, index));
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      Array.from(files).forEach((file, index) => validateAndProcessFile(file, index));
    }
  };

  return (
    <div className="pdf-extractor max-w-4xl mx-auto p-12 bg-gradient-to-r from-indigo-100 to-blue-100 shadow-xl rounded-lg">
      <div
        className="drag-drop-area border-4 border-dashed border-indigo-500 p-12 text-center rounded-xl cursor-pointer transition-all hover:border-indigo-600 hover:bg-indigo-50"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className="text-gray-700 font-semibold text-lg mb-8">
          Drag and drop your PDF files here, or click to upload.
        </p>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          multiple
          style={{ display: "none" }}
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="file-upload-button inline-block px-8 py-4 bg-indigo-600 text-white rounded-lg text-xl font-semibold shadow-md cursor-pointer transform transition-transform duration-200 hover:scale-105 hover:bg-indigo-700"
        >
          Choose Files
        </label>
      </div>

      {feedback && (
        <p
          className={`feedback mt-8 text-center p-4 rounded-md ${
            feedback.includes("successfully")
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {feedback}
        </p>
      )}

      {texts && (
        <div className="mt-8">
          <h4 className="text-xl font-bold mb-4">Extracted Text from Files:</h4>
          <textarea
            value={texts}
            readOnly
            rows="12"
            className="w-full p-6 border rounded-lg bg-white text-gray-700 shadow-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            style={{ height: "250px" }}
          />
        </div>
      )}
    </div>
  );
}

function PromptInput({ prompt, onChange }) {
  return (
    <input
      type="text"
      value={prompt}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your prompt here..."
      className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg placeholder-gray-500 transition duration-200"
    />
  );
}

function RoleInput({ role, onChange }) {
  return (
    <div className="w-full max-w-xs mx-auto">
      <label
        htmlFor="role"
        className="block text-xl font-medium text-gray-800 dark:text-white mb-4" 
      >
        Role
      </label>
      <input
        type="text"
        value={role}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter Role"
        className="w-full p-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 text-xl placeholder-gray-400 transition-all duration-300 ease-in-out hover:border-indigo-400"
      />
    </div>
  );
}

function ResponseDisplay({ response, candidateName }) {
  if (!response || !response.score) {
    return null;
  }

  const { analysis, score, highlights } = response;

  const formattedAnalysis = marked(analysis || "No analysis provided.");

  const scoreDetails = [
    { title: "Relevance to Job Description", weight: 50, description: "How well the resume matches the job description." },
    { title: "Inclusion of Key Sections", weight: 30, description: "Ensures the presence of essential sections (e.g., Skills, Experience)." },
    { title: "Formatting Quality", weight: 20, description: "Evaluates bullet points, spacing, and structure." },
  ];

  return (
    <div className="bg-white shadow-md p-4 rounded-lg mt-4 max-3xl mx-auto">
      {candidateName && (
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          Resume Analysis for {candidateName}
        </h3>
      )}

      <div
        dangerouslySetInnerHTML={{ __html: formattedAnalysis }}
        className="mt-2 text-gray-700 leading-relaxed"
      />

      <h3 className="mt-4 text-lg font-semibold text-gray-800">Resume Score</h3>
      <div className="w-full bg-gray-300 rounded-full h-8 mt-2 overflow-hidden relative">
        <div
          className={`h-full transition-all duration-500 ease-in-out ${score >= 70 ? "bg-green-400" : "bg-yellow-400"}`}
          style={{ width: `${score}%` }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
          {score}/100
        </span>
      </div>

      <h4 className="mt-4 text-md font-semibold text-gray-800">Scoring Criteria</h4>
      <ul className="list-disc pl-6 text-gray-600 mt-2 space-y-1">
        {scoreDetails.map((detail, index) => (
          <li key={index} className="flex flex-col space-y-1">
            <span className="text-md font-medium text-gray-700">
              {detail.title} ({detail.weight}%):
            </span>
            <span>{detail.description}</span>
          </li>
        ))}
      </ul>

      {highlights && (
        <>
          <h4 className="mt-4 text-md font-semibold text-gray-800">Key Highlights</h4>
          <div className="mt-2 text-gray-600">
            <h5 className="font-semibold text-gray-700">Strengths:</h5>
            <ul className="list-disc pl-6 space-y-1">
              {highlights.strengths?.map((strength, index) => (
                <li key={index} className="text-md">{strength}</li>
              )) || <li className="text-md">No strengths identified.</li>}
            </ul>
            <h5 className="mt-2 font-semibold text-gray-700">Weaknesses:</h5>
            <ul className="list-disc pl-6 space-y-1">
              {highlights.weaknesses?.map((weakness, index) => (
                <li key={index} className="text-md">{weakness}</li>
              )) || <li className="text-md">No weaknesses identified.</li>}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export { PDFTextExtractor, PromptInput, ResponseDisplay, RoleInput };
