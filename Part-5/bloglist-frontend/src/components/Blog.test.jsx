import { getByText, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, vi } from "vitest";

import Blog from "./Blog";

describe("<Blog/>", () => {
  const mockHandler = vi.fn();

  beforeEach(() => {
    render(<Blog blog={blog} increaseLikeCount={mockHandler} />);
  });

  const blog = {
    title: "Hello new World",
    id: "2341234sdf",
    author: "Junior Santos",
    url: "www.com",
    likes: 4,
  };

  test("renders blog's title and author but NOT url and likes", () => {
    //Renders blog and title
    const title = screen.getByText("Title: Hello new World");
    const author = screen.getByText("Author: Junior Santos");
    expect(title).toBeVisible();
    expect(author).toBeVisible();

    //Don't renders url and likes
    const url = screen.queryByText("Url: www.com");
    const likes = screen.queryByText("Likes: 4");
    expect(url).not.toBeVisible();
    expect(likes).not.toBeVisible();
  });

  test("Show url and likes when 'view' button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("View");
    await user.click(button);

    const url = screen.getByText("Url: www.com");
    expect(url).toBeVisible();

    const likes = screen.getByText("Url: www.com");
    expect(likes).toBeVisible();
  });

  test("Like button is clicked twice, event handler is called twice", async () => {
    //Click 'view' button
    const user = userEvent.setup();
    const viewButton = screen.getByText("View");
    await user.click(viewButton);

    //Click 'like' button
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
    expect(mockHandler).toHaveBeenCalledTimes(2);
    console.log(mockHandler.mock.calls.length);
  });
});
