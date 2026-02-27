import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";

import { setNotification } from "../reducers/notificationReducer";
import { appendAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";

    // const response = await anecdotesService.createNew(content);
    // dispatch(createAnecdote(response));
    dispatch(appendAnecdote(content));
    // dispatch(createDisplayNotification(`You created: ${content}`));
    // setTimeout(() => {
    //   dispatch(clearNotification());
    // }, 5000);
    dispatch(setNotification(`You created '${content}'`, 10));
  };

  return (
    <>
      <h2>Create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">Create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
