const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

let arrCountVotes = [...initialState];

const anecdoteReducer = (state = initialState, action) => {
  // console.log("action: ", action);
  // console.log(initialState, "initialState from reducer");

  switch (action.type) {
    case "INCREASE_COUNT":
      // state.forEach((item, i) => {
      //   if (item.id === action.payload.id) {
      //     arrCountVotes[i].votes++;
      //   }
      // });
      // return arrCountVotes.map((item) => item);

      const id = action.payload.id;
      return state.map((a) => (a.id === id ? { ...a, votes: a.votes + 1 } : a));
    default:
      return state;
  }
};

export default anecdoteReducer;
