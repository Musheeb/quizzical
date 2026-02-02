import { nanoid } from "nanoid";

import "./Quiz.css";
import Question from "../Question/Question.jsx";

import { quiz } from "../../api/quiz.api.js";
import { useState, useEffect } from "react";

export default function Quiz() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchQuiz() {
      const quizData = await quiz();

      const formattedData = quizData.results.map((q) => ({
        id: nanoid(),
        question: q.question,
        correct_answer: q.correct_answer,
        options: [...q.incorrect_answers, q.correct_answer]
          .map((opt) => ({
            id: nanoid(),
            value: opt,
            isHeld: false,
            sort: Math.ceil(Math.random() * 10),
          }))
          .sort((a, b) => a.sort - b.sort)
          .map(({ sort, ...rest }) => rest),
      }));
      console.log(formattedData);
      setData(formattedData);
    }
    fetchQuiz();
  }, []);

  function selectOption(id) {
    console.log("clicked Id - ", id);
  }

  return (
    <div className="quiz-container">
      <img
        src="/blob-yellow.png"
        alt="yellow-blob"
        className="quiz__blob--yellow"
      />
      {data.map((quizData) => {
        return (
          <Question
            key={quizData.id}
            id={quizData.id}
            question={quizData.question}
            options={quizData.options}
            correctAnswer={quizData.correct_answer}
            selectOption={() => selectOption(quizData.id)}
          />
        );
      })}
      <button className="quiz__button--answers">Check answers</button>
      <img src="/blob-blue.png" alt="blue-blob" className="quiz__blob--blue" />
    </div>
  );
}
