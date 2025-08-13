import { useState } from "react";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      style={{ borderRadius: "5px", border: "1px solid black", margin: "5px" }}
    >
      {props.text}
    </button>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [count, setCount] = useState([]);

  const handleGood = () => {
    const goodScore = 1;
    const goodUpdated = good + 1;
    setGood(goodUpdated);
    setCount(count.concat(goodScore));
  };

  const handleNeutral = () => {
    const neutralScore = 0;
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
    setCount(neutralScore);
    setCount(count.concat(neutralScore));
  };

  const handleBad = () => {
    const badScore = -1;
    const updatedBad = bad + 1;
    setBad(updatedBad);
    setCount(badScore);
    setCount(count.concat(badScore));
  };

  const handleAverage = () => {
    const sum = count.reduce((acc, total) => acc + total, 0);
    const arrLength = count.length;
    return sum / arrLength;
  };

  console.log(count);
  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {good + neutral + bad}</p>
      <p>Average: {handleAverage() || 0}</p>
      <p>Positive: {(good / (good + neutral + bad)) * 100 || 0}%</p>
    </>
  );
};

export default App;
