import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  test("renders without crashing", () => {
    render(<Header />);
  });

  test("opens and closes drawer when menu button is clicked", () => {
    const { getByLabelText, getByRole } = render(<Header />);

    // Drawer should be initially closed
    const drawer = getByRole("presentation");
    expect(drawer).not.toHaveClass("MuiDrawer-open");

    // Click the menu button to open the drawer
    const menuButton = getByLabelText("menu");
    fireEvent.click(menuButton);

    // Drawer should be open after click
    expect(drawer).toHaveClass("MuiDrawer-open");

    // Click the menu button again to close the drawer
    fireEvent.click(menuButton);

    // Drawer should be closed after second click
    expect(drawer).not.toHaveClass("MuiDrawer-open");
  });
});
