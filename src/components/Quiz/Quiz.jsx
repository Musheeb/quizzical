import { nanoid } from "nanoid";

import "./Quiz.css";
import Question from "../Question/Question.jsx";

import { quiz } from "../../api/quiz.api.js";
import { useState, useEffect } from "react";

export default function Quiz() {
  const [data, setData] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameKey, setGameKey] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
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
      // console.log(formattedData);
      setData(formattedData);
      setIsLoading(false);
    }
    fetchQuiz();
  }, [gameKey]);

  function selectOption(questionId, optionId) {
    setData((prevData) => {
      return prevData.map((quizData) => {
        if (quizData.id === questionId) {
          return {
            ...quizData,
            options: quizData.options.map((quizItem) => {
              if (quizItem.id === optionId) {
                return {
                  ...quizItem,
                  isHeld: !quizItem.isHeld,
                };
              } else {
                return { ...quizItem, isHeld: false };
              }
            }),
          };
        } else {
          return {
            ...quizData,
          };
        }
      });
    });
  }

  function showAnswers() {
    setShowAnswer((prevValue) => !prevValue);
  }

  function getCorrectAnswersCount(answers) {
    const correctAnswerCount = answers.filter((quizData) => {
      const heldAnswerByUser = quizData.options.find((option) => option.isHeld);
      return (
        heldAnswerByUser && quizData.correct_answer === heldAnswerByUser.value
      );
    }).length;
    return correctAnswerCount;
  }

  function playAgain() {
    setGameKey((prevGameKey) => prevGameKey + 1);
    setShowAnswer(false);
  }

  return (
    <div className="quiz-container">
      <img
        src="/blob-yellow.png"
        alt="yellow-blob"
        className="quiz__blob--yellow"
      />
      {isLoading && (
        <div className="quiz-loader">
          <div className="spinner"></div>
          {/* <p className="quiz__loader--paragraph">Loading questions.....</p> */}
        </div>
      )}
      {data.map((quizData) => {
        return (
          <Question
            key={quizData.id}
            id={quizData.id}
            question={quizData.question}
            options={quizData.options}
            correctAnswer={quizData.correct_answer}
            selectOption={selectOption}
            answerShowed={showAnswer}
          />
        );
      })}
      {data.length > 0 &&
        (showAnswer ? (
          <div className="quiz__show__answers--section">
            <p className="quiz__show_answers--paragraph">
              You scored {getCorrectAnswersCount(data)}/{data.length} correct
              answers
            </p>
            <button className="quiz__button--answers" onClick={playAgain}>
              Play again
            </button>
          </div>
        ) : (
          <button className="quiz__button--answers" onClick={showAnswers}>
            Check answers
          </button>
        ))}
      <img src="/blob-blue.png" alt="blue-blob" className="quiz__blob--blue" />
    </div>
  );
}
