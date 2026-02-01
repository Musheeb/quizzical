import "./Start.css";

export default function Start(props) {
  return (
    <div className="start-container">
      <img
        src="/blob-yellow.png"
        alt="blob-yellow"
        className="blob-yellow-img"
      />
      <h1>Quizzical</h1>
      <p>Want to get some knowledge? go ahead and click the button below</p>
      <button className="start-quiz-button" onClick={props.onClick}>
        Start quiz
      </button>
      <img src="/blob-blue.png" alt="blob-blue" className="blob-blue-img" />
    </div>
  );
}
