import { ChapterWithQuestions, Question, UserAnswer } from "@/lib/type";


interface FillBlankAnswerReviewProps {
  chapter: ChapterWithQuestions;
  chapterAnswers: UserAnswer[];
}

export const FillBlankAnswerReview = ({ 
  chapter, 
  chapterAnswers 
}: FillBlankAnswerReviewProps) => {
  // Helper function to check if question has [...] pattern
  const hasBlankPattern = (question: Question): boolean => {
    return question.question.includes('[...]');
  };

  // Group questions by subtopic, only including questions with [...]
  const groupedQuestions = chapter.questions.reduce((acc: Record<string, Question[]>, question) => {
    if (hasBlankPattern(question)) {
      const subtopic = question.subtopic || 'Background';
      if (!acc[subtopic]) {
        acc[subtopic] = [];
      }
      acc[subtopic].push(question);
    }
    return acc;
  }, {});

  const renderQuestionContent = (
    question: Question,
    userAnswer: UserAnswer | undefined,
    parts: string[]
  ) => {
    if (!userAnswer) {
      return (
        <div className="text-sm text-gray-600">
          <div className="flex items-baseline">
            <span>{parts[0]}</span>
            <span className="mx-2 px-2 py-1 border border-gray-300 rounded-md bg-gray-50 w-44 text-center">
              Not attempted
            </span>
            <span>{parts[1]}</span>
          </div>
          <div className="mt-2 ml-4">
            <span className="font-medium">Correct answer: </span>
            <span className="text-green-600">{question.answer}</span>
          </div>
        </div>
      );
    }

    const isCorrect = userAnswer.answer.toLowerCase().trim() === question.answer.toLowerCase().trim();

    return (
      <div className="text-sm">
        <div className="flex items-baseline">
          <span>{parts[0]}</span>
          <span className={`mx-2 px-2 py-1 rounded-md w-44 text-center ${
            isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {userAnswer.answer}
          </span>
          <span>{parts[1]}</span>
        </div>
        <div className="mt-2 ml-4 space-y-1">
          <div>
            <span className="font-medium">Your answer: </span>
            <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
              {userAnswer.answer}
            </span>
          </div>
          <div>
            <span className="font-medium">Correct answer: </span>
            <span className="text-green-600">{question.answer}</span>
          </div>
        </div>
      </div>
    );
  };

  // Count total questions with [...] and correct answers
  const totalQuestions = Object.values(groupedQuestions).flat().length;
  const correctAnswers = chapterAnswers.filter(answer => {
    const question = chapter.questions.find(q => q.id === answer.questionId);
    return question && answer.answer.toLowerCase().trim() === question.answer.toLowerCase().trim();
  }).length;

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      {/* Score Summary */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Summary</h2>
        <p className="text-lg text-gray-600">
          Score: {correctAnswers} out of {totalQuestions} questions
        </p>
      </div>

      {/* Questions Review */}
      <div className="space-y-8">
        {Object.entries(groupedQuestions).map(([subtopic, questions]) => (
          <div key={subtopic} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {subtopic}
            </h3>
            <div className="space-y-6">
              {questions.map((question) => {
                const userAnswer = chapterAnswers.find(a => a.questionId === question.id);
                const parts = question.question.split('[...]');

                return (
                  <div key={question.id} className="border-l-4 pl-4 py-2 ml-4 space-y-2">
                    <div className="flex flex-col space-y-2">
                      {renderQuestionContent(question, userAnswer, parts)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};