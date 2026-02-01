import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, vi } from "vitest";

import BlogForm from "./BlogForm";

describe("<BlogForm/>", () => {
  const mockHandler = vi.fn();

  test("Calls event handler with right details when new blog is created", async () => {
    render(<BlogForm handleChange={mockHandler} />);

    const user = userEvent.setup();

    //Add info to input fields
    const inputTitle = screen.getByRole("textbox", { name: "Title:" });
    const inputAuthor = screen.getByRole("textbox", { name: "Author:" });
    const inputUrl = screen.getByRole("textbox", { name: "Url:" });

    //Find button, add info to input fields and click button
    const createBtn = screen.getByText("Create");

    await user.type(inputTitle, "new title");
    await user.type(inputAuthor, "Junior");
    await user.type(inputUrl, "www");

    await user.click(createBtn);

    expect(mockHandler.mock.calls).toHaveLength(1);
    // console.log(mockHandler.mock.calls[0][0]);
    expect(mockHandler).toHaveBeenCalledWith({
      title: "new title",
      author: "Junior",
      url: "www",
    });
  });
});
