import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ProjectForm from "./ProjectForm";

describe("ProjectForm", () => {
  test("renders without crashing", () => {
    render(<ProjectForm />);
  });

  test("updates form state on input change", () => {
    const { getByLabelText } = render(<ProjectForm />);

    const titleInput = getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "New Title" } });

    expect(titleInput.value).toBe("New Title");
  });

  test("submits form with correct data", async () => {
    const formData = {
      frontendTech: "React",
      backendTech: "Node.js",
      designTool: "Figma",
      title: "Project Title",
      description: "Project Description",
      goal: "Project Goal",
      domain: "E-commerce",
      meetingTime: "2024-01-01T12:00",
    };

    const handleSubmit = jest.fn();

    const { getByLabelText, getByText } = render(
      <ProjectForm onSubmit={handleSubmit} />
    );

    fireEvent.change(getByLabelText("Title"), {
      target: { value: formData.title },
    });
    fireEvent.change(getByLabelText("Description"), {
      target: { value: formData.description },
    });
    fireEvent.change(getByLabelText("Goal"), {
      target: { value: formData.goal },
    });
    fireEvent.change(getByLabelText("Meeting Time"), {
      target: { value: formData.meetingTime },
    });

    fireEvent.click(getByText("Submit"));

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith(formData);
    });
  });
});
