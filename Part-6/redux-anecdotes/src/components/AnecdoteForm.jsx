import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import { setNotificationWithTimeout } from "../helper_func/setNotificationWithTimeout";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";

    dispatch(createAnecdote(content));
    // dispatch(createDisplayNotification(`You created: ${content}`));
    // setTimeout(() => {
    //   dispatch(clearNotification());
    // }, 5000);
    setNotificationWithTimeout(dispatch, `You created: ${content}`);
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
