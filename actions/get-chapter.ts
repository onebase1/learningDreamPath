// path: actions/get-chapters/get-chapter.ts
import { db } from "@/lib/db";
import { Attachment, Chapter } from "@prisma/client";
import { POSITIONS } from "./constants";

interface GetChapterProps {
  userId: string;
  courseId: string;
  chapterId: string;
}

export const getChapter = async ({
  userId,
  courseId,
  chapterId,
}: GetChapterProps) => {
  try {
    const course = await db.course.findUnique({
      where: {
        id: courseId,
        isPublished: true,
      },
      include: {
        category: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
      include: {
        questions: true,
      },
    });

    if (!course || !chapter) {
      throw new Error("Chapter or course not found");
    }

    // Fetch attachments
    const attachments = await db.attachment.findMany({
      where: { courseId },
    });

    // Fetch Mux data if any
    const muxData = await db.muxData.findUnique({
      where: { chapterId },
    });

    // Get next chapter for navigation
    const nextChapter = await db.chapter.findFirst({
      where: {
        courseId,
        isPublished: true,
        position: {
          gt: chapter.position,
        },
      },
      orderBy: {
        position: "asc",
      },
    });

    // Attempt to get user progress
    const userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    const position = chapter.position;
    const chapterType = getChapterType(position);

    // Identify which portion of the exam we’re in
    const isListening = {
      isPartA_1: position === POSITIONS.LISTENING.PART_A1,
      isPartA_2: position === POSITIONS.LISTENING.PART_A2,
      isPartB: position === POSITIONS.LISTENING.PART_B,
      isPartC_1: position === POSITIONS.LISTENING.PART_C1,
      isPartC_2: position === POSITIONS.LISTENING.PART_C2,
    };

    const isReading = {
      isPartA: position === POSITIONS.READING_A.MAIN,
      isPartB:
        position >= POSITIONS.READING_BC.B_Q1 &&
        position <= POSITIONS.READING_BC.B_Q6,
      isPartC:
        position === POSITIONS.READING_BC.C_SEC1 ||
        position === POSITIONS.READING_BC.C_SEC2,
      isPartB_Question:
        position >= POSITIONS.READING_BC.B_Q1 &&
        position <= POSITIONS.READING_BC.B_Q6,
      isPartC_Section1: position === POSITIONS.READING_BC.C_SEC1,
      isPartC_Section2: position === POSITIONS.READING_BC.C_SEC2,
    };

    const isSpeaking = {
      isSpeakingSection:
        position >= POSITIONS.SPEAKING.MEDICAL_CONS &&
        position <= POSITIONS.SPEAKING.DISCHARGE,
    };

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase: null, // You mentioned that purchase is irrelevant here
      ...isListening,
      ...isReading,
      ...isSpeaking,
      chapterType,
    };
  } catch (error) {
    console.log("[GET_CHAPTER_ERROR]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
      chapterType: null,
      isPartA_1: false,
      isPartA_2: false,
      isPartB: false,
      isPartC_1: false,
      isPartC_2: false,
      isPartA: false,
      isPartB_Question: false,
      isPartC: false,
      isPartC_Section1: false,
      isPartC_Section2: false,
    };
  }
};

function getChapterType(position: number):
  | "listening"
  | "reading-a"
  | "reading-bc"
  | "writing"
  | "speaking"
  | null {
  if (position <= 5) return "listening";
  if (position === 6) return "reading-a";
  if (position >= 7 && position <= 14) return "reading-bc";
  if (position === 15) return "writing";
  if (position >= 16 && position <= 21) return "speaking";
  return null;
}
