import "./Question.css";

export default function Question(props) {
  return (
    <div className="question-container">
      <h3 className="question__container--individual">{props.question}</h3>
      <div className="question__container--options">
        {props.options.map((opt) => {
          let styles = {};
          if (
            opt.isHeld &&
            props.answerShowed &&
            props.correctAnswer !== opt.value
          ) {
            styles.backgroundColor = "#F8BCBC";
          } else if (opt.isHeld) {
            styles.backgroundColor = "#D6DBF5";
          } else {
            styles.backgroundColor = "#F5F7FB";
          }

          if (props.answerShowed && props.correctAnswer === opt.value) {
            styles.backgroundColor = "#94D7A2";
          }
          //   const styles = {
          //     backgroundColor: opt.isHeld ? "#D6DBF5" : "#F5F7FB",
          //   };
          return (
            <span
              className="question-option"
              key={opt.id}
              style={styles}
              onClick={() => props.selectOption(props.id, opt.id)}
            >
              {opt.value}
            </span>
          );
        })}
      </div>
      <hr className="question-ruler" />
    </div>
  );
}
