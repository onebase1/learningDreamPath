// MCQAnswerReview.tsx

import { ChapterWithQuestions, UserAnswer } from "@/lib/type";


interface MCQAnswerReviewProps {
  chapter: ChapterWithQuestions;
  chapterAnswers: UserAnswer[];
}

export const MCQAnswerReview = ({ chapter, chapterAnswers }: MCQAnswerReviewProps) => {
  const totalQuestions = chapter.questions.length;
  const correctAnswers = chapterAnswers.filter(answer => {
    const question = chapter.questions.find(q => q.id === answer.questionId);
    return question && answer.answer === question.answer;
  }).length;

  // Helper function to parse options
  const parseOptions = (questionOptions: any): string[] => {
    if (!questionOptions) return [];
    if (Array.isArray(questionOptions)) return questionOptions;
    try {
      const parsed = JSON.parse(questionOptions);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Summary</h2>
        <p className="text-lg text-gray-600">
          Score: {correctAnswers} out of {totalQuestions} questions
        </p>
      </div>

      <div className="space-y-8">
        {chapter.questions.map((question, index) => {
          const userAnswer = chapterAnswers.find(a => a.questionId === question.id);
          const optionsArray = parseOptions(question.options);
          const hasAttempted = Boolean(userAnswer);

          return (
            <div key={question.id} className="border-l-4 pl-6 py-4 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg text-gray-700">Question {index + 1}</span>
                  {!hasAttempted && (
                    <span className="text-sm text-gray-500 px-2 py-1 bg-gray-100 rounded-full">
                      Not attempted
                    </span>
                  )}
                </div>
                <p className="text-gray-800 mb-4">{question.question}</p>
              </div>

              <div className="space-y-3">
                {optionsArray.map((option: string, i: number) => {
                  const isCorrectAnswer = option === question.answer;
                  const isUserAnswer = hasAttempted && option === userAnswer?.answer;
                  
                  let bgColor = 'bg-white';
                  let borderColor = 'border-gray-200';
                  let labelText = '';
                  let labelColor = '';
                  
                  if (hasAttempted) {
                    if (isCorrectAnswer && isUserAnswer) {
                      bgColor = 'bg-green-50';
                      borderColor = 'border-green-200';
                      labelText = 'Correct';
                      labelColor = 'text-green-600';
                    } else if (isCorrectAnswer) {
                      bgColor = 'bg-green-50';
                      borderColor = 'border-green-200';
                      labelText = 'Correct Answer';
                      labelColor = 'text-green-600';
                    } else if (isUserAnswer) {
                      bgColor = 'bg-red-50';
                      borderColor = 'border-red-200';
                      labelText = 'Your Answer';
                      labelColor = 'text-red-600';
                    }
                  }

                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border ${bgColor} ${borderColor} flex justify-between items-center hover:border-gray-300 transition-colors`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-700 min-w-[24px]">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        <span className="text-gray-800">{option}</span>
                      </div>
                      {hasAttempted && labelText && (
                        <div className={`flex items-center ${labelColor} font-medium text-sm`}>
                          {labelText}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {hasAttempted && userAnswer?.answer !== question.answer && (
                <div className="mt-3 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Explanation: </span>
                    The correct answer is option{' '}
                    {String.fromCharCode(65 + optionsArray.findIndex((opt: string) => opt === question.answer))}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};