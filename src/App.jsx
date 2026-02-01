import "./App.css";
import Start from "./components/Start/Start.jsx";
import Quiz from "./components/Quiz/Quiz.jsx";

import { useState } from "react";

function App() {
  const [quiz, setQuiz] = useState(false);
  function onStartQuiz() {
    setQuiz((prevQuiz) => {
      return !prevQuiz;
    });
  }
  return (
    <div className="main-quiz-container">
      {quiz ? <Quiz /> : <Start onClick={onStartQuiz} />}
    </div>
  );
}

export default App;
