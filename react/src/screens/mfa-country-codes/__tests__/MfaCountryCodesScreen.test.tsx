import { useErrors } from "@auth0/auth0-acul-react/mfa-country-codes";
import { act, fireEvent, render, screen } from "@testing-library/react";

import MfaCountryCodesScreen from "../index";

describe("MfaCountryCodesScreen", () => {
  const renderScreen = async () => {
    await act(async () => {
      render(<MfaCountryCodesScreen />);
    });
    await screen.findByText(/select your country code/i);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with title, back button, search box, and country list", async () => {
    await renderScreen();

    // Verify title and back button
    expect(screen.getByText("Select your country code")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go back/i })
    ).toBeInTheDocument();

    // Verify search box
    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();

    // Verify countries are displayed with flags
    expect(screen.getByText(/Afghanistan \(\+93\)/)).toBeInTheDocument();
    expect(screen.getByText(/United States \(\+1\)/)).toBeInTheDocument();

    // Verify document title
    expect(document.title).toBe("Select your country code | All Applications");
  });

  it("should filter countries by name, country code, and phone prefix", async () => {
    await renderScreen();

    const searchInput = screen.getByPlaceholderText("Search");

    // Filter by country name
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "united" } });
    });
    expect(screen.getByText(/United States \(\+1\)/)).toBeInTheDocument();
    expect(screen.queryByText(/Afghanistan \(\+93\)/)).not.toBeInTheDocument();

    // Filter by country code
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "AF" } });
    });
    expect(screen.getByText(/Afghanistan \(\+93\)/)).toBeInTheDocument();
    expect(screen.queryByText(/Albania \(\+355\)/)).not.toBeInTheDocument();

    // Filter by phone prefix
    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "93" } });
    });
    expect(screen.getByText(/Afghanistan \(\+93\)/)).toBeInTheDocument();
  });

  it("should show 'No countries found' message when search has no results", async () => {
    await renderScreen();

    const searchInput = screen.getByPlaceholderText("Search");

    await act(async () => {
      fireEvent.change(searchInput, { target: { value: "xyz123" } });
    });

    expect(screen.getByText("No countries found")).toBeInTheDocument();
    expect(screen.queryByText(/Afghanistan/)).not.toBeInTheDocument();
  });

  it("should handle country selection click", async () => {
    await renderScreen();

    const afghanistanButton = screen
      .getByText(/Afghanistan \(\+93\)/)
      .closest("button");

    expect(afghanistanButton).toBeInTheDocument();

    await act(async () => {
      afghanistanButton?.click();
    });

    // Verify button is clickable
    expect(afghanistanButton).toBeInTheDocument();
  });

  it("should display general errors and filter out field-specific errors", async () => {
    const generalError = "Unable to load country codes";

    const mockUseErrors = useErrors as jest.Mock;

    // Mock useErrors to return errors
    mockUseErrors.mockReturnValue({
      errors: {
        byField: jest.fn(() => []),
        byType: jest.fn(() => [{ id: "1", message: generalError }]),
      },
      hasError: true,
      dismiss: jest.fn(),
      dismissAll: jest.fn(),
    });

    await renderScreen();

    // General error should be displayed
    expect(screen.getByText(generalError)).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
