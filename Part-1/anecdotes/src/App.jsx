import { useState } from "react";
const Buffer = require("buffer").Buffer;

const buf = Buffer.from("hello world", "utf8");

console.log(buf.toString("utf8"));

const MostVoted = ({ anecdote, votes }) => {
  if (votes)
    return (
      <>
        <h2>Anecdote with most votes</h2>
        <p>{anecdote}</p>
        <p>Has {votes} votes</p>
      </>
    );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

  const randomNumber = () => {
    setSelected((Math.random() * 7).toFixed(0));
  };

  const voteAnecdote = () => {
    const copyVote = [...vote];
    copyVote[selected] = copyVote[selected] + 1;
    setVote(copyVote);
  };

  const countVote = vote.reduce((a, b) => (a > b ? a : b), 0);
  const mapVotes = vote.findIndex((item) => item === countVote);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {vote[selected]} votes</p>
      <button
        onClick={voteAnecdote}
        style={{
          border: "solid 1px darkGrey",
          borderRadius: "5px",
          padding: "5px",
          margin: "2px",
          cursor: "pointer",
        }}
      >
        Vote
      </button>
      <button
        onClick={randomNumber}
        style={{
          border: "solid 1px darkGrey",
          borderRadius: "5px",
          padding: "5px",
          margin: "2px",
          cursor: "pointer",
        }}
      >
        Next Anecdote
      </button>
      {/* <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mapVotes]}</p>
      <p>Has {countVote} votes</p> */}
      <MostVoted anecdote={anecdotes[mapVotes]} votes={countVote} />
    </div>
  );
};

export default App;
