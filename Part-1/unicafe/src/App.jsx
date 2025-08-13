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

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (!all) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }
  return (
    <>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {all}</p>
      <p>Average: {average}</p>
      <p>Positive: {positive}%</p>
    </>
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

  const statistics = {
    good,
    neutral,
    bad,
    all: good + neutral + bad,
    average: count.length ? count.reduce((a, b) => a + b, 0) / count.length : 0,
    positive: (good / (good + neutral + bad)) * 100 || 0,
  };

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Statistics
        // good={good}
        // neutral={neutral}
        // bad={bad}
        // all={statistics.all}
        // average={statistics.average}
        // positive={statistics.positive}
        {...statistics}
      />
    </>
  );
};

export default App;
