import "./Question.css";

export default function Question(props) {
  return (
    <div className="question-container">
      <h3>{props.question}</h3>
      <div className="question__container--options">
        {props.options.map((opt) => {
          const styles = {
            backgroundColor: opt.isHeld ? "#D6DBF5" : "#F5F7FB",
          };
          return (
            <span
              className="question-option"
              key={opt.id}
              style={styles}
              onClick={props.selectOption}
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
