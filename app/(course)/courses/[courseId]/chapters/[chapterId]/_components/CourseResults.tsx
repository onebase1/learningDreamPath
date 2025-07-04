// import React from "react";

// type Question = {
//   id: string;
//   question: string;
//   answer: string;
// };

// type Chapter = {
//   id: string;
//   title: string;
//   questions: Question[];
// };

// type Course = {
//   id: string;
//   title: string;
//   chapters: Chapter[];
// };

// type UserAnswer = {
//   questionId: string;
//   answer: string;
// };

// type CourseResultsProps = {
//   course: Course;
//   courseProgress: any;
//   userAnswers: UserAnswer[];
// };

// const CourseResults: React.FC<CourseResultsProps> = ({ course, courseProgress, userAnswers }) => {
//   const getUserAnswer = (questionId: string) => {
//     const answer = userAnswers.find((ua) => ua.questionId === questionId);
//     return answer ? answer.answer : "";
//   };

//   const isAnswerCorrect = (question: Question) => {
//     const userAnswer = getUserAnswer(question.id);
//     return userAnswer === question.answer;
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">{course.title} - Results</h1>
//       {course.chapters.map((chapter) => (
//         <div key={chapter.id} className="mb-6">
//           <h2 className="text-xl font-semibold mb-2">{chapter.title}</h2>
//           <ul className="list-disc pl-5 space-y-2">
//             {chapter.questions.map((question, index) => (
//               <li key={question.id} className="mb-2">
//                 <p className="font-bold">{index + 1}. {question.question}</p>
//                 <p className={`ml-4 ${isAnswerCorrect(question) ? "text-green-600" : "text-red-600"}`}>
//                   Your answer: {getUserAnswer(question.id)}
//                 </p>
//                 {!isAnswerCorrect(question) && (
//                   <p className="ml-4 text-gray-600">Correct answer: {question.answer}</p>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default CourseResults;