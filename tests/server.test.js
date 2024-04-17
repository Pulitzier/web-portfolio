const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./server");
const ProjectFormData = require("./models/ProjectFormData");

// Mock ProjectFormData.create to prevent database writes during tests
jest.mock("./models/ProjectFormData", () => ({
  create: jest.fn(),
}));

describe("POST /project-form", () => {
  afterAll(async () => {
    // Close the MongoDB connection after all tests
    await mongoose.connection.close();
  });

  afterEach(() => {
    // Reset the mock implementation after each test
    ProjectFormData.create.mockClear();
  });

  test("responds with 200 and success message", async () => {
    // Mock successful email sending
    const sgMailSendMock = jest.fn(() => Promise.resolve("Email sent"));
    const sgMailMock = { send: sgMailSendMock };
    jest.mock("@sendgrid/mail", () => sgMailMock);

    const formData = {
      // Provide sample form data
      frontendTech: "React",
      backendTech: "Node.js",
    };

    // Mock ProjectFormData.create to resolve with sample data
    ProjectFormData.create.mockResolvedValueOnce(formData);

    // Send POST request to the server
    const response = await request(app).post("/project-form").send(formData);

    // Assert the response
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Form data saved and email confirmation sent successfully",
      savedFormData: formData,
    });

    // Assert that ProjectFormData.create was called with the correct data
    expect(ProjectFormData.create).toHaveBeenCalledTimes(1);
    expect(ProjectFormData.create).toHaveBeenCalledWith(formData);

    // Assert that the email was sent with the correct message
    expect(sgMailSendMock).toHaveBeenCalledTimes(1);
    expect(sgMailSendMock).toHaveBeenCalledWith({
      to: "recipient@example.com",
      from: "your-email@example.com",
      subject: "Project Form Submission Confirmation",
      text: expect.stringContaining(
        "Thank you for submitting the project form."
      ),
    });
  });

  test("responds with 500 if an error occurs", async () => {
    // Mock ProjectFormData.create to reject with an error
    const errorMessage = "Database error";
    ProjectFormData.create.mockRejectedValueOnce(new Error(errorMessage));

    // Send POST request to the server
    const response = await request(app).post("/project-form").send({});

    // Assert the response
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to process form submission",
    });

    // Assert that ProjectFormData.create was called with the correct data
    expect(ProjectFormData.create).toHaveBeenCalledTimes(1);

    // Assert that the email was not sent
    expect(sgMailSendMock).not.toHaveBeenCalled();
  });
});
