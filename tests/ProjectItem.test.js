import React from "react";
import { render } from "@testing-library/react";
import ProjectItem from "./ProjectItem";

describe("ProjectItem", () => {
  test("renders without crashing", () => {
    render(<ProjectItem />);
  });

  test("renders title and description correctly", () => {
    const title = "Project Title";
    const description = "Project Description";
    const imageUrl = "https://example.com/image.jpg";

    const { getByText, getByAltText } = render(
      <ProjectItem
        title={title}
        description={description}
        imageUrl={imageUrl}
      />
    );

    // Check if title and description are rendered correctly
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(description)).toBeInTheDocument();

    // Check if image is rendered correctly
    const imageElement = getByAltText(title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", imageUrl);
  });
});
