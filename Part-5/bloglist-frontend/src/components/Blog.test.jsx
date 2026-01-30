import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, vi } from "vitest";

import Blog from "./Blog";

test("renders blog's title and author", () => {
  const blog = {
    title: "Hello new World",
    id: "2341234sdf",
    author: "Junior Santos",
    url: "www.com",
    likes: 4,
  };

  render(<Blog blog={blog} />);

  const title = screen.getByText("Title: Hello new World");
  const author = screen.getByText("Author: Junior Santos");
  const url = screen.queryByText("Url: www.com");
  const likes = screen.queryByText("Likes: 4");

  expect(title).toBeVisible();
  expect(author).toBeVisible();
  expect(url).not.toBeVisible();
  expect(likes).not.toBeVisible();
});
