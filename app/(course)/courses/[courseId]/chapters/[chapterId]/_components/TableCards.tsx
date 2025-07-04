import React from 'react';

interface Chapter {
  title: string;
  position: number;
  description: string;
}

interface TableCardsProps {
  chapter: Chapter;
  cardType: string;
  description?: string;
}

const TableCards: React.FC<TableCardsProps> = ({ chapter, cardType, description = "this topic" }) => {
  const renderIntroText = () => {
 
    
    switch (chapter.position) {
      // Existing listening test cases (1-5)...
      case 1:
        return (
          <p>  
            <strong>Part A</strong>
            <br />
            <br />
            <strong>In this part of the test</strong>, you'll hear two different extracts. In each extract, you'll hear health professionals talking about aspects of their work.
            <br />
            <br />
            <strong>For questions 1-24</strong>, choose the answer (A, B or C) which fits best according to what you hear. Complete your 
              answers as you listen.
            <br />
            <br />
            <strong>Now look at notes for extract one</strong>
          </p>
        );

      // Reading test cases
      case 6:
        return (
          <p>  
            <strong>Part A</strong>
            <br />
            <br />
            <strong>TIME: </strong> 15 minutes.
            <br />
            <br />
            Look at the four texts, <strong>A-D</strong>, in the <strong>PDF on the left screen.</strong>
            <br />
            <br />
            For each question, <strong>1-20</strong>, look through the texts, <strong>A-D</strong>, to find the relevant information.
            <br />
            <br />
            Complete your answers in the spaces provided <strong>below</strong>.
            <br />
            <br />
            Answer all the questions within the 15 minutes time limit.
            <br />
            <br />
            Your answers should <strong>only</strong> be taken from the texts, <strong>A-D</strong> and must be correctly spelt.
          </p>
        );

      case 7:
        return (
          <p>  
            <strong>Part B</strong>
            <br />
            <br />
            In this part of the test, there are six short extracts relating to the work of health professionals.
            <br />
            <br />
            For <strong>questions 1-6</strong>, choose the answer <strong>(A, B or C)</strong> which fits best according to the text.
          </p>
        );

      case 13:
        return (
          <p>  
            <strong>Part C</strong>
            <br />
            <br />
            In this part of the test, there are two texts about different aspects of healthcare.
            <br />
            <br />
            For <strong>questions 7-14</strong>, choose the answer <strong>(A, B, C or D)</strong> which you think fits best according to the text.
          </p>
        );

      // Handle other cases
      case 2:
        return "";

      case 3:
        return (
          <p>
            <strong>Now look at Part B</strong>
            <br />
            <br />
            <strong>Part B</strong>
            <br />
            <br />
            <strong>In this part of the test</strong>, you'll hear six different extracts. In each extract, you'll hear people talking in a different 
            healthcare setting. 
            <br />
            <br />
            <strong>For questions 25-30</strong>, choose the answer (<strong>A, B</strong> or <strong>C</strong>) which fits best according to what you hear. You'll have time  
            to read each question before you listen. Complete your answers as you listen.
            <br />
            <br />
            Now look at question 25
          </p>
        );

      case 4:
        return (
          <p>
            <strong>Now look at Part C.</strong>
            <br />
            <br />    
            <strong>Part C</strong>
            <br />
            <br />
            In this part of the test, you'll hear two different extracts. In each extract, you'll hear health professionals talking about aspects of their work.
            <br />
            <br />
            <strong>For questions 31-42</strong>, choose the answer (A, B or C) which fits best according to what you hear. Complete your 
              answers as you listen.
            <br />
            <br />
            <strong>Now look at extract one</strong>
          </p>
        );

      case 5:
        return (
          <div className='py-4'>
            <p>
              <strong>Now look at extract 2.</strong>
              <br />
              <br />
              <strong>Extract 2: Questions 37 - 42.</strong>
              <br />
              <br />
              <strong>{chapter.title}</strong>
              <br />
              <br />
              You now have 90 seconds to read <strong>questions 37-42</strong>
            </p>
          </div>
        );

      default:
        // Return empty string for positions we don't handle
        return "";
    }
  };

  const renderSubIntroText = () => {
    switch (chapter.position) {
      // Listening Test Cases
      case 1:
        return <p>
          <strong>Extract 1: Questions 1-12</strong>
          <br />
          <br />
          <strong>{chapter.title}</strong> 
          <br />
          <br />
          <strong>For questions 1-12</strong>, complete the notes with a word or short phrase that you hear.
          <br />
          <br />
          You now have thirty seconds to look at the notes.
          </p>;

      case 2:
        return <p>
          <strong>Extract 2: Questions 13-24</strong>   
          <br />
          <br />
          <strong>{chapter.title}</strong>    
          <br />
          <br />
          <strong>For questions 13-24</strong>, complete the notes with a word or short phrase that you hear.
          <br />
          You now have thirty seconds to look at the notes.
          </p>;

      case 4:
        return <p>
          <strong>Extract 1: Questions 31-36</strong>
          <br />
          <br />
          <strong>{chapter.title}</strong> 
          <br />
          <br />
          <strong>For questions 31-36</strong>, complete the notes with a word or short phrase that you hear.
          <br />
          <br />
          You now have 90 seconds to look at the notes.
          </p>;
      
      // Reading Test Cases
      case 6:
        return <p>
          <strong>{chapter.title}</strong>: Questions
          <br />
          <br />
          <strong>Questions 1-6</strong>
          <br />
          <br />
          For each question<strong>, 1-6,</strong> decide which text (<strong>A, B, C or D</strong>) the information comes from. You may use any letter more than once.
          </p>;

      case 13:
        return <p>
          <strong>Text 1: Questions 7-14</strong>
          </p>;

      case 14:
        return <p>
          <strong>Text 2: Questions 7-14</strong>
          </p>;

      default: 
        return null; 
    }
  };

  const renderFooterText = () => {
    switch (chapter.position) {
      // Listening Test Cases
      case 1:
        return <p>
          <strong>You will have the remaining Section time to check your answers</strong>.
          <br />     
          </p>;
      case 2:
        return <p>
          <strong>That is the end of Part A. You will have the remaining Section time to check your answers.</strong>
          </p>;
      case 3:
        return <p>
          <strong>That is the end of Part B. You will have the remaining Section time to check your answers.</strong>
          </p>;
      case 4:
        return <p>
          <strong>You will have the remaining Section time to check your answers.</strong>
          </p>;
      case 5:
        return <p>
          <strong>That is the end of Part C.</strong>
          <br />
          <strong>You will have the remaining Section time to check your answers.</strong>
          <br />
          <strong>THAT IS THE END OF THE LISTENING TEST</strong>
          </p>;
      
      // Reading Test Cases
      case 6:
        return <p>
          <strong>END OF PART A MOCK TEST</strong>
          </p>;
      case 14:
        return <p>
          <strong>END OF THE READING MOCK TEST</strong>
          </p>;
  
      // No footer text for other positions
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {cardType === "instructions" && renderIntroText() && (
        <div className="bg-gray-100 p-4 rounded">
          {renderIntroText()}
        </div>
      )}
      {cardType === "description" && renderSubIntroText() && (
        <div className="bg-gray-100 p-4 rounded">
          {renderSubIntroText()}
        </div>
      )}
      {cardType === "footer" && renderFooterText() && (
        <div className="bg-gray-100 p-4 mt-8 rounded">
          {renderFooterText()}
        </div>
      )}
    </div>
  );
};

export default TableCards;