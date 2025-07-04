-- DropForeignKey
ALTER TABLE "BetaFeedback" DROP CONSTRAINT "BetaFeedback_courseId_fkey";

-- AddForeignKey
ALTER TABLE "BetaFeedback" ADD CONSTRAINT "BetaFeedback_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
