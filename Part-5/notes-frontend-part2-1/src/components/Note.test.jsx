import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, vi } from "vitest";

import Note from "./Note";
import NoteForm from "./NoteForm";
import Togglable from "./Togglable";

test("renders content", () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  render(<Note note={note} />);

  // const element = screen.getByText(
  //   "Component testing is done with react-testing-library",
  //   { exact: false } /* If we want to look for the same type of value,
  //   in this case a string whatever it is will pass the test. */,
  // );

  //   screen.debug(element);
  //   expect(element).toBeDefined();
});

test("clicking the button calls event handler once", async () => {
  const note = {
    content: "Component testing is done with react-testing-library",
    important: true,
  };

  const mockHandler = vi.fn();

  render(<Note note={note} toggleImportance={mockHandler} />);

  const user = userEvent.setup(); /* Simulates the user */
  const button = screen.getByText("make not important");
  await user.click(button); /* Simulates the user clicking on the button */

  screen.debug(button); /* Prints the html of a component to the terminal */
  expect(mockHandler.mock.calls).toHaveLength(1);
});

describe("<Togglable />", () => {
  beforeEach(() => {
    render(
      <Togglable buttonLabel="show...">
        <div>Togglable content</div>
      </Togglable>,
    );
  });

  test("renders its children", () => {
    screen.getByText("Togglable content");
  });

  test("at start the children are not displayed", () => {
    const element = screen.getByText("Togglable content");
    expect(element).not.toBeVisible();
  });

  test("after clicking the button, children are displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const element = screen.getByText("Togglable content");
    expect(element).toBeVisible();
  });

  test("toggled content can be closed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show...");
    await user.click(button);

    const closeButton = screen.getByText("Cancel");
    await user.click(closeButton);

    const element = screen.getByText("Togglable content");
    expect(element).not.toBeVisible();
  });
});

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
  const createNote = vi.fn();
  const user = userEvent.setup();

  /* Element can be selected using 'querySelector */
  // const { container } = render(<NoteForm createNote={createNote} />);
  // const input = container.querySelector("#note-input");

  /* Element can be selected using methods below */
  render(<NoteForm createNote={createNote} />);
  const input = screen.getByPlaceholderText("Write note content here");
  // const input = screen.getByLabelText("content");
  // const input = screen.getAllByRole("textbox"); /*Select all input fields*/
  const sendButton = screen.getByText("save");

  await user.type(input, "testing a form...");
  await user.click(sendButton);

  expect(createNote.mock.calls).toHaveLength(1);
  expect(createNote.mock.calls[0][0].content).toBe("testing a form...");

  /* It's possible to see what the calls 
  stored in 'createNote.mock.calls' look like.
  
  console.log(createNote.mock.calls);
  console.log(createNote.mock.calls[0][0]);
  */
});
