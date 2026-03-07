import { createContext, useState } from "react";

export const QuizzContext = createContext(); 

const QuizzContextProvider = ({ children }) => {
  const [quizz, setQuizz] = useState([]);

  return (
    <QuizzContext>
      {children}
    </QuizzContext>
  );
};

export default QuizzContextProvider;