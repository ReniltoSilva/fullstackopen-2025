import { useState } from "react";

const Button = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      style={{ borderRadius: "5px", border: "1px solid black", margin: "5px" }}
    >
      {text}
    </button>
  );
};

const StatisticLine = ({ text, value }) => {
  // console.log(text, value);
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
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
      <table>
        <tbody>
          <StatisticLine value={good} text="Good" />
          <StatisticLine value={neutral} text="Neutral" />
          <StatisticLine value={bad} text="Bad" />
          <StatisticLine value={all} text="All" />
          <StatisticLine value={average} text="Average" />
          <StatisticLine value={positive} text="Positive" />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [count, setCount] = useState([]);

  const handleGood = () => {
    setGood(good + 1);
    setCount(count.concat(1));
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setCount(count.concat(0));
  };

  const handleBad = () => {
    setBad(bad + 1);
    setCount(count.concat(-1));
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
      <Statistics {...statistics} />
    </>
  );
};

export default App;
