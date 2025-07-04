// path: scripts/seed-speaking.ts

import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

// Include constants directly in seed file
const POSITIONS = {
  SPEAKING: {
    MEDICAL_CONS: 16,
    NURSING_CARE: 17,
    TREATMENT_PLAN: 18,
    PATIENT_EDU: 19,
    HANDOVER: 20,
    DISCHARGE: 21
  }
} as const;

const courseDefaults = {
  userId: "user_2i5qgRexpPxWvj2TzyvZCmOwKj5",
  price: 49.99,
  isPublished: true,
  description: "Thank you for choosing DreamPath! Practice your speaking skills with our interactive OET scenarios.",
  // imageUrl: "TODO: Add image URL",
};

const speakingScenarios = [
  {
    position: POSITIONS.SPEAKING.MEDICAL_CONS,
    title: "Medical Consultation - Diabetes Management",
    options: {
      profession: "Doctor",
      scenario: "Initial Diabetes Consultation",
      script: "Hello, I understand you've been referred by your GP regarding concerns about your blood sugar levels. Your recent tests show elevated glucose readings. I'd like to discuss this with you and understand how it's affecting you.",
      expectedPoints: [
        "Ask about symptoms and their duration",
        "Inquire about current diet and lifestyle",
        "Check family history of diabetes",
        "Discuss blood sugar monitoring",
        "Show empathy towards patient concerns",
        "Explain treatment options clearly"
      ]
    }
  },
  {
    position: POSITIONS.SPEAKING.NURSING_CARE,
    title: "Nursing Care - Post-Surgery Assessment",
    options: {
      profession: "Nurse",
      scenario: "Post-Operative Care",
      script: "Good morning, I'm here to check how you're doing after your knee surgery yesterday. Could you tell me about your pain levels and if the current medication is helping?",
      expectedPoints: [
        "Assess pain levels using scale",
        "Check wound site",
        "Verify medication effectiveness",
        "Encourage mobility within limits",
        "Provide clear aftercare instructions",
        "Address patient concerns compassionately"
      ]
    }
  }
];

async function main() {
  try {
    // 1. Create or find Speaking category
    const speakingCategory = await database.category.upsert({
      where: { name: "Speaking" },
      update: {},
      create: { 
        name: "Speaking",
        type: "speaking"
      }
    });

    console.log("Created/Found category:", speakingCategory);

    // 2. Create Speaking Course
    const speakingCourse = await database.course.create({
      data: {
        ...courseDefaults,
        title: "Speaking Practice - Healthcare Scenarios",
        categoryId: speakingCategory.id,
      }
    });

    console.log("Created course:", speakingCourse);

    // 3. Create Speaking Chapters
    for (const scenario of speakingScenarios) {
      const chapter = await database.chapter.create({
        data: {
          courseId: speakingCourse.id,
          title: scenario.title,
          position: scenario.position,
          partType: "speaking",
          options: scenario.options,
          isPublished: true,
          isFree: false,
          timeLimit: 300, // 5 minutes per scenario
        }
      });
      console.log("Created chapter:", chapter.title);
    }

    console.log("Successfully seeded speaking scenarios");

  } catch (error) {
    console.error("Error seeding speaking data:", error);
  } finally {
    await database.$disconnect();
  }
}

main();