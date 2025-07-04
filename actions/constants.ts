// actions/constants.ts
export const POSITIONS = {
  LISTENING: {
    PART_A1: 1,    // Questions 1-12
    PART_A2: 2,    // Questions 13-24
    PART_B: 3,     // Questions 25-30
    PART_C1: 4,    // Questions 31-36
    PART_C2: 5     // Questions 37-42
  },
  READING_A: {
    MAIN: 6        // Single chapter with 20 questions (3 sections)
  },
  READING_BC: {
    B_Q1: 7,       // Question 1 with image
    B_Q2: 8,       // Question 2 with image
    B_Q3: 9,       // Question 3 with image
    B_Q4: 10,      // Question 4 with image
    B_Q5: 11,      // Question 5 with image
    B_Q6: 12,      // Question 6 with image
    C_SEC1: 13,    // Questions 7-14 (single text)
    C_SEC2: 14     // Questions 15-22 (single text)
  },

  WRITTING: {
    MAIN: 6        // Single chapter with 20 questions (3 sections)
  },
  SPEAKING: {       // Changed from ROLEPLAY
    MEDICAL_CONS: 16,     // Medical Consultation
    NURSING_CARE: 17,     // Nursing Care
    TREATMENT_PLAN: 18,   // Treatment Planning
    PATIENT_EDU: 19,      // Patient Education
    HANDOVER: 20,         // Clinical Handover
    DISCHARGE: 21         // Discharge Planning
  }
};

// File: app/actions/constants.ts

export const GRADES = {
  A: {
    min: 450,
    max: 500,
    description: "Excellent! You demonstrate fluent and effective communication...",
    achievement: "Fluent and effective communication with complete comprehension",
    nextSteps: "Practice with advanced medical terminology..."
  },
  B: {
    min: 350,
    max: 440,
    description: "Good progress! You show strong understanding...",
    achievement: "Good clinical understanding with occasional inaccuracies",
    nextSteps: "Work on technical medical vocabulary..."
  },
  "C+": {
    min: 300,
    max: 340,
    description: "You're on the right track! You can maintain interaction...",
    achievement: "Basic clinical interaction with noticeable errors",
    nextSteps: "Review common medical terms..."
  },
  C: {
    min: 200,
    max: 290,
    description: "You have the basics but need more practice...",
    achievement: "Limited clinical communication with frequent errors",
    nextSteps: "Start with basic medical terminology exercises..."
  },
  D: {
    min: 100,
    max: 190,
    description: "You're starting your journey. Prioritize building vocabulary...",
    achievement: "Basic comprehension needs significant improvement",
    nextSteps: "Begin with basic medical reading exercises..."
  },
  E: {
    min: 0,
    max: 90,
    description: "Don't worry - everyone starts somewhere! Let's build your foundation...",
    achievement: "Fundamental skills need development",
    nextSteps: "Start with our basic medical terminology course..."
  },
};

// Map gradeKey to star values
export const gradeStarMapping = {
  'A': 5,
  'B': 4,
  'C': 3,
  'D': 2,
  'E': 1,
};

export const mSCORING = {
  TIME_LIMIT: 180, // 3 hours in minutes
  PASS_THRESHOLD: 350,
  GRADE_BOUNDARIES: {
    A: 450,
    B: 350,
    'C+': 300,
    C: 200,
    D: 100,
    E: 0
  }
};

export const SCORING = {
  READING_BC: {
      TIME_LIMIT: 2520, // 42 minutes in seconds
      PART_B: {
          QUESTIONS: 6,
          START_POSITION: POSITIONS.READING_BC.B_Q1,
          END_POSITION: POSITIONS.READING_BC.B_Q6,
          MARKS_PER_QUESTION: 1,
          TOTAL_MARKS: 6
      },
      PART_C: {
          QUESTIONS_PER_SECTION: 8,
          SECTIONS: 2,
          SECTION1_START: 7,  // Question numbering starts at 7
          SECTION2_START: 15, // Question numbering starts at 15
          MARKS_PER_QUESTION: 1,
          TOTAL_MARKS: 16
      },
      GRADES: {
          A: { 
              min: 450, 
              max: 500, 
              description: "Excellent! You demonstrate fluent and effective communication skills. Focus on maintaining consistency and perhaps challenge yourself with more complex medical scenarios.",
              achievement: "Fluent and effective communication with complete comprehension",
              nextSteps: "Practice with advanced medical terminology and complex case studies to maintain this level"
          },
          B: { 
              min: 350, 
              max: 440, 
              description: "Good progress! You show strong understanding but have occasional inaccuracies. Focus on reducing hesitations and improving precision in clinical contexts.",
              achievement: "Good clinical understanding with occasional inaccuracies",
              nextSteps: "Work on technical medical vocabulary and practice more timed exercises to build confidence"
          },
          "C+": { 
              min: 300, 
              max: 340, 
              description: "You're on the right track! You can maintain interaction but need to reduce errors. Focus on improving accuracy and expanding your medical vocabulary.",
              achievement: "Basic clinical interaction with noticeable errors",
              nextSteps: "Review common medical terms, practice reading speed, and focus on understanding key details in medical texts"
          },
          C: { 
              min: 200, 
              max: 290, 
              description: "You have the basics but need more practice. Focus on building your medical vocabulary and improving your reading speed and comprehension.",
              achievement: "Limited clinical communication with frequent errors",
              nextSteps: "Start with basic medical terminology exercises, practice time management, and work through foundational reading materials"
          },
          D: { 
              min: 100, 
              max: 190, 
              description: "You're starting your journey. Prioritize building your medical vocabulary and basic comprehension skills. Consider starting with our foundational courses.",
              achievement: "Basic comprehension needs significant improvement",
              nextSteps: "Begin with basic medical reading exercises, focus on time management, and use our vocabulary building tools"
          },
          E: { 
              min: 0, 
              max: 90, 
              description: "Don't worry - everyone starts somewhere! Let's build your foundation with basic medical terminology and reading comprehension exercises.",
              achievement: "Fundamental skills need development",
              nextSteps: "Start with our basic medical terminology course, practice basic reading exercises, and work on time management skills"
                }
            }
        }
      };
