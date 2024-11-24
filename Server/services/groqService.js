// const Groq = require("groq-sdk");

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY || "your-api-key-here",
// });

// exports.analyzeResume = async (prompt, role) => {
//   const chatCompletion = await groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: `${prompt} [End of Resume]. Now, analyze the resume content for ${role} and give scores on Skillsets, Role Fitment, Projects, and give the whole response in a structured way without any extra text.`,
//       },
//     ],
//     model: "llama3-8b-8192",
//   });

//   const content = chatCompletion.choices[0]?.message?.content || "No response received.";
//   return content;
// };

// const Groq = require("groq-sdk");

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY || "your-api-key-here",
// });

// // Define scoring criteria
// const SCORE_WEIGHTS = {
//   relevance: 50, // Weight for relevance
//   sections: 30,  // Weight for key sections
//   formatting: 20 // Weight for formatting quality
// };

// // List of required sections in the resume
// const REQUIRED_SECTIONS = ["Summary", "Skills", "Experience", "Education"];

// exports.analyzeResume = async (prompt, role) => {
//   const chatCompletion = await groq.chat.completions.create({
//     messages: [
//       {
//         role: "user",
//         content: `${prompt} [End of Resume]. Now, analyze the resume content for ${role} and provide a detailed analysis including relevance, key sections, formatting, and an overall score (0–100).`,
//       },
//     ],
//     model: "llama3-8b-8192",
//   });

//   const content = chatCompletion.choices[0]?.message?.content || "No response received.";

//   // Calculate a "Resume Score"
//   const score = calculateResumeScore(prompt, role);
//   return { analysis: content, score };
// };

// const calculateResumeScore = (resumeText, jobDescription) => {
//   let totalScore = 0;

//   // **1. Relevance to Job Description (50 points)**
//   const keywords = extractKeywords(jobDescription);
//   const keywordMatches = keywords.filter((keyword) => resumeText.includes(keyword)).length;
//   const relevanceScore = Math.min((keywordMatches / keywords.length) * SCORE_WEIGHTS.relevance, SCORE_WEIGHTS.relevance);

//   // **2. Inclusion of Key Sections (30 points)**
//   const sectionMatches = REQUIRED_SECTIONS.filter((section) =>
//     resumeText.toLowerCase().includes(section.toLowerCase())
//   ).length;
//   const sectionsScore = (sectionMatches / REQUIRED_SECTIONS.length) * SCORE_WEIGHTS.sections;

//   // **3. Formatting Quality (20 points)**
//   const formattingScore = checkFormattingQuality(resumeText) * SCORE_WEIGHTS.formatting;

//   // Sum up scores
//   totalScore = relevanceScore + sectionsScore + formattingScore;
//   return Math.round(totalScore); // Final score out of 100
// };

// const extractKeywords = (text) => {
//   // Extract keywords from job description
//   return text
//     .split(/\W+/) // Split by non-word characters
//     .filter((word) => word.length > 3) // Include words with more than 3 characters
//     .map((word) => word.toLowerCase());
// };

// const checkFormattingQuality = (text) => {
//   // Basic formatting quality check: presence of bullet points, line spacing, etc.
//   const bulletPoints = (text.match(/•|-|\*/g) || []).length;
//   const lineSpacing = (text.match(/\n\s*\n/g) || []).length;

//   // If there are reasonable bullet points and spacing, score is higher
//   return Math.min((bulletPoints + lineSpacing) / 20, 1); // Normalize to 1
// };


// const Groq = require("groq-sdk");

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY || "your-api-key-here",
// });

// // Define scoring criteria weights
// const SCORE_WEIGHTS = {
//   relevance: 50, // Weight for relevance
//   sections: 30,  // Weight for key sections
//   formatting: 20 // Weight for formatting quality
// };

// // List of required sections in the resume
// const REQUIRED_SECTIONS = ["Summary", "Skills", "Experience", "Education"];

// // Function to analyze a resume and return a detailed response
// exports.analyzeResume = async (prompt, role) => {
//   try {
//     // Send prompt to Groq's chat API
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: `${prompt} [End of Resume]. Now, analyze the resume content for the role of ${role} and provide a detailed analysis including relevance, key sections, formatting, and an overall score (0–100). Highlight strengths and weaknesses.`,
//         },
//       ],
//       model: "llama3-8b-8192",
//     });

//     const content = chatCompletion.choices[0]?.message?.content || "";

//     // Calculate a "Resume Score"
//     const score = calculateResumeScore(prompt, role);

//     // Extract strengths and weaknesses
//     const highlights = analyzeHighlights(prompt, role);

//     return { analysis: content, score, highlights };
//   } catch (error) {
//     console.error("Error analyzing resume:", error);
//     throw new Error("An error occurred while analyzing the resume.");
//   }
// };

// exports.getUsernameContact = async (prompt) => {
//   try {
//     const chatCompletion = await groq.chat.completions.create({
//       messages: [
//         {
//           role: "user",
//           content: `${prompt} [End of Resume]. From this extracted content, only return the Candidate name, phone number, separated by (sep). Don't generate any extra text as I am going to parse it.`,
//         },
//       ],
//       model: "llama3-8b-8192",
//     });

//     const content = chatCompletion.choices[0]?.message?.content || "";

//     const [username, contact_no] = content.split("(sep)").map((item) => item.trim());

//     return { username, contact_no };
//   } catch (error) {
//     console.error("Error analyzing resume:", error);
//     throw new Error("An error occurred while analyzing the resume.");
//   }
// };


// // Calculate the score for the resume
// const calculateResumeScore = (resumeText, jobDescription) => {
//   let totalScore = 0;

//   // **1. Relevance to Job Description (50 points)**
//   const keywords = extractKeywords(jobDescription);
//   const keywordMatches = keywords.filter((keyword) => resumeText.includes(keyword)).length;
//   const relevanceScore = Math.min((keywordMatches / keywords.length) * SCORE_WEIGHTS.relevance, SCORE_WEIGHTS.relevance);

//   // **2. Inclusion of Key Sections (30 points)**
//   const sectionMatches = REQUIRED_SECTIONS.filter((section) =>
//     resumeText.toLowerCase().includes(section.toLowerCase())
//   ).length;
//   const sectionsScore = (sectionMatches / REQUIRED_SECTIONS.length) * SCORE_WEIGHTS.sections;

//   // **3. Formatting Quality (20 points)**
//   const formattingScore = checkFormattingQuality(resumeText) * SCORE_WEIGHTS.formatting;

//   // Sum up scores
//   totalScore = relevanceScore + sectionsScore + formattingScore;
//   return Math.round(totalScore); // Final score out of 100
// };

// // Analyze highlights: extract strengths and weaknesses
// const analyzeHighlights = (resumeText, jobDescription) => {
//   const strengths = [];
//   const weaknesses = [];

//   // Relevance
//   const keywords = extractKeywords(jobDescription);
//   const keywordMatches = keywords.filter((keyword) => resumeText.includes(keyword)).length;
//   if (keywordMatches / keywords.length >= 0.7) {
//     strengths.push("Good alignment with job description.");
//   } else {
//     weaknesses.push("Low alignment with job description. Add more role-specific keywords.");
//   }

//   // Sections
//   REQUIRED_SECTIONS.forEach((section) => {
//     if (resumeText.toLowerCase().includes(section.toLowerCase())) {
//       strengths.push(`Includes the section: ${section}.`);
//     } else {
//       weaknesses.push(`Missing the section: ${section}.`);
//     }
//   });

//   // Formatting
//   const formattingScore = checkFormattingQuality(resumeText);
//   if (formattingScore > 0.8) {
//     strengths.push("Well-formatted with proper bullet points and spacing.");
//   } else {
//     weaknesses.push("Formatting could be improved with more bullet points or better structure.");
//   }

//   return { strengths, weaknesses };
// };

// // Extract keywords from the job description
// const extractKeywords = (text) => {
//   return text
//     .split(/\W+/) // Split by non-word characters
//     .filter((word) => word.length > 3) // Include words with more than 3 characters
//     .map((word) => word.toLowerCase());
// };

// // Check formatting quality of the resume
// const checkFormattingQuality = (text) => {
//   const bulletPoints = (text.match(/•|-|\*/g) || []).length;
//   const lineSpacing = (text.match(/\n\s*\n/g) || []).length;

//   // If there are reasonable bullet points and spacing, score is higher
//   return Math.min((bulletPoints + lineSpacing) / 20, 1); // Normalize to 1
// };
/*
 * =============================================================================
 * Developer: Aryan Sharma
 * Purpose: This file provides functions to analyze resumes using the Groq API 
 *          for scoring and extracting information like name and contact details. 
 *          It also includes utility functions for calculating scores and 
 *          extracting strengths/weaknesses for better insights into resume quality.
 * =============================================================================
 *
 * Edit History:
 * -----------------------------------------------------------------------------
 * Date           Author          Changes
 * -----------------------------------------------------------------------------
 * 2024-11-23     Aryan Sharma    Initial version with core functionalities.
 *
 * =============================================================================
 */

// Import the Groq SDK
const Groq = require("groq-sdk");

// Initialize Groq API client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "your-api-key-here",
});

// Scoring criteria weights
const SCORE_WEIGHTS = {
  relevance: 50, // Weight for relevance
  sections: 30,  // Weight for key sections
  formatting: 20 // Weight for formatting quality
};
const requirement = `
 and provide a detailed analysis including relevance, key sections, formatting, and an overall score (0–100). 

- Start with the **Candidate Details** section, including:
  - Name
  - Phone Number
  - Address
  - Email ID

- Then, move to the **Project Details** section, with individual project titles as subsections.
- **Certifications** section 
- Follow with the **Analysis Report Section**

- Use **bullet points** to highlight:
  - Strengths
  - Weaknesses

- Conclude with an **Improvement Suggestions** section in bullet points.

Ensure the response is concise and structured with clear subpoints. Avoid long paragraphs.
`;


// Required sections in the resume
const REQUIRED_SECTIONS = ["Summary", "Skills", "Experience", "Education"];

/**
 * Analyzes a resume based on relevance, section inclusion, and formatting.
 * 
 * @param {string} prompt - The raw resume text content.
 * @param {string} role - The job role to analyze the resume against.
 * @returns {Promise<object>} - Returns an object containing the analysis,
 *                              overall score, and highlights (strengths/weaknesses).
 */
exports.analyzeResume = async (prompt, role) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt+` [End of Resume]. Now, analyze the resume content for the role of ${role} `+requirement
        },
      ],
      model: "llama3-8b-8192",
    });

    const content = chatCompletion.choices[0]?.message?.content || "";
    console.log(content)
    // Calculate a "Resume Score"
    const score = calculateResumeScore(prompt, role);

    // Extract strengths and weaknesses
    const highlights = analyzeHighlights(prompt, role);

    return { analysis: content, score, highlights };
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("An error occurred while analyzing the resume.");
  }
};

/**
 * Extracts the candidate's name and phone number from the resume.
 * 
 * @param {string} prompt - The raw resume text content.
 * @returns {Promise<object>} - Returns an object containing the candidate's 
 *                              name and contact number.
 */
exports.getUsernameContact = async (prompt) => {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `${prompt} [End of Resume]. From this extracted content, only return the Candidate name, phone number, separated by (sep). Don't generate any extra text as I am going to parse it.`,
        },
      ],
      model: "llama3-8b-8192",
    });

    const content = chatCompletion.choices[0]?.message?.content || "";

    const [username, contact_no] = content.split("(sep)").map((item) => item.trim());

    return { username, contact_no };
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("An error occurred while analyzing the resume.");
  }
};

/**
 * Calculates an overall score for the resume based on defined criteria.
 * 
 * @param {string} resumeText - The raw text of the resume.
 * @param {string} jobDescription - The job description for relevance analysis.
 * @returns {number} - The calculated score (0–100).
 */
// const calculateResumeScore = (resumeText, jobDescription) => {
//   let totalScore = 0;

//   // Relevance to Job Description (50 points)
//   const keywords = extractKeywords(jobDescription);
//   const keywordMatches = keywords.filter((keyword) => resumeText.includes(keyword)).length;
//   const relevanceScore = Math.min((keywordMatches / keywords.length) * SCORE_WEIGHTS.relevance, SCORE_WEIGHTS.relevance);

//   // Inclusion of Key Sections (30 points)
//   const sectionMatches = REQUIRED_SECTIONS.filter((section) =>
//     resumeText.toLowerCase().includes(section.toLowerCase())
//   ).length;
//   const sectionsScore = (sectionMatches / REQUIRED_SECTIONS.length) * SCORE_WEIGHTS.sections;

//   // Formatting Quality (20 points)
//   const formattingScore = checkFormattingQuality(resumeText) * SCORE_WEIGHTS.formatting;

//   // Total Score
//   totalScore = relevanceScore + sectionsScore + formattingScore;
//   return Math.round(totalScore);
// };

const calculateResumeScore = (resumeText, jobDescription) => {
  let totalScore = 0;

  // Relevance to Job Description (50 points)
  const keywords = extractKeywords(jobDescription);
  const keywordMatches = keywords.filter((keyword) => resumeText.includes(keyword)).length;

  // Moderate check for relevance: partial match will give partial score
  const relevanceRatio = keywordMatches / keywords.length;
  const relevanceScore = relevanceRatio >= 0.5 
    ? relevanceRatio * SCORE_WEIGHTS.relevance 
    : (relevanceRatio * SCORE_WEIGHTS.relevance) / 2;

  // Inclusion of Key Sections (30 points)
  const sectionMatches = REQUIRED_SECTIONS.filter((section) =>
    resumeText.toLowerCase().includes(section.toLowerCase())
  ).length;

  // Moderate scoring for sections: give credit even for partial matches
  const sectionsScore = (sectionMatches / REQUIRED_SECTIONS.length) * SCORE_WEIGHTS.sections;

  // Formatting Quality (20 points)
  const formattingScore = checkFormattingQuality(resumeText) * SCORE_WEIGHTS.formatting;

  // Total Score
  totalScore = relevanceScore + sectionsScore + formattingScore;

  // Normalize score to 100
  return Math.round(totalScore);
};


/**
 * Analyzes strengths and weaknesses of the resume.
 * 
 * @param {string} resumeText - The raw text of the resume.
 * @param {string} jobDescription - The job description for relevance analysis.
 * @returns {object} - An object containing arrays of strengths and weaknesses.
 */
// const analyzeHighlights = (resumeText, jobDescription) => {
//   const strengths = [];
//   const weaknesses = [];

//   // Relevance
//   const keywords = extractKeywords(jobDescription);
//   const keywordMatches = keywords.filter((keyword) => resumeText.includes(keyword)).length;
//   if (keywordMatches / keywords.length >= 0.7) {
//     strengths.push("Good alignment with job description.");
//   } else {
//     weaknesses.push("Low alignment with job description. Add more role-specific keywords.");
//   }

//   // Sections
//   REQUIRED_SECTIONS.forEach((section) => {
//     if (resumeText.toLowerCase().includes(section.toLowerCase())) {
//       strengths.push(`Includes the section: ${section}.`);
//     } else {
//       weaknesses.push(`Missing the section: ${section}.`);
//     }
//   });

//   // Formatting
//   const formattingScore = checkFormattingQuality(resumeText);
//   if (formattingScore > 0.8) {
//     strengths.push("Well-formatted with proper bullet points and spacing.");
//   } else {
//     weaknesses.push("Formatting could be improved with more bullet points or better structure.");
//   }

//   return { strengths, weaknesses };
// };

const analyzeHighlights = (resumeText, jobDescription) => {
  const strengths = [];
  const weaknesses = [];

  // Relevance
  const keywords = extractKeywords(jobDescription);
  const keywordMatches = keywords.filter((keyword) => resumeText.includes(keyword)).length;
  const relevanceRatio = keywordMatches / keywords.length;

  if (relevanceRatio >= 0.9) {
    strengths.push("Strong alignment with job description.");
  } else if (relevanceRatio >= 0.8) {
    strengths.push("Moderate alignment with job description.");
    weaknesses.push("Add more role-specific keywords to improve relevance.");
  } else {
    weaknesses.push("Low alignment with job description. Add significantly more role-specific keywords.");
  }

  // Sections
  REQUIRED_SECTIONS.forEach((section) => {
    if (resumeText.toLowerCase().includes(section.toLowerCase())) {
      strengths.push(`Includes the section: ${section}.`);
    } else {
      weaknesses.push(`Missing the section: ${section}.`);
    }
  });

  // Formatting
  const formattingScore = checkFormattingQuality(resumeText);
  if (formattingScore > 0.8) {
    strengths.push("Well-formatted with proper bullet points and spacing.");
  } else if (formattingScore > 0.9) {
    strengths.push("Decent formatting with room for improvement.");
    weaknesses.push("Consider improving formatting by using consistent bullet points and spacing.");
  } else {
    weaknesses.push("Formatting is poor. Use more bullet points or a better structure.");
  }

  return { strengths, weaknesses };
};


/**
 * Extracts keywords from a given text.
 * 
 * @param {string} text - The input text to extract keywords from.
 * @returns {string[]} - An array of keywords.
 */
const extractKeywords = (text) => {
  return text
    .split(/\W+/) // Split by non-word characters
    .filter((word) => word.length > 3) // Include words with more than 3 characters
    .map((word) => word.toLowerCase());
};

/**
 * Checks the formatting quality of the resume.
 * 
 * @param {string} text - The raw text of the resume.
 * @returns {number} - A normalized score (0–1) based on formatting quality.
 */
const checkFormattingQuality = (text) => {
  const bulletPoints = (text.match(/•|-|\*/g) || []).length;
  const lineSpacing = (text.match(/\n\s*\n/g) || []).length;

  // If there are reasonable bullet points and spacing, score is higher
  return Math.min((bulletPoints + lineSpacing) / 20, 1); // Normalize to 1
};
