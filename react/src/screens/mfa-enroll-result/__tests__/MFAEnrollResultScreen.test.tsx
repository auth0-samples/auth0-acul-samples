import { render, screen } from "@testing-library/react";

import { useMfaEnrollResultManager } from "@/__mocks__/@auth0/auth0-acul-react/mfa-enroll-result";

import Header from "../components/Header";

jest.mock("../hooks/useMfaEnrollResultManager", () => ({
  useMfaEnrollResultManager: jest.requireActual(
    "@/__mocks__/@auth0/auth0-acul-react/mfa-enroll-result"
  ).useMfaEnrollResultManager,
}));

describe("Header", () => {
  const mockUseManager = useMfaEnrollResultManager as jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  const testCases = [
    {
      status: "success",
      expectedIconTestId: "success-icon",
      expectedTitle: "Enrolled Successfully",
      expectedDescription: "MFA enrollment was successful.",
    },
    {
      status: "already-enrolled",
      expectedIconTestId: "error-icon",
      expectedTitle: "Already Enrolled",
      expectedDescription: "You are already enrolled in MFA.",
    },
    {
      status: "already-used",
      expectedIconTestId: "error-icon",
      expectedTitle: "Link Already Used",
      expectedDescription: "This link has already been used.",
    },
    {
      status: "invalid-ticket",
      expectedIconTestId: "error-icon",
      expectedTitle: "Invalid Ticket",
      expectedDescription: "This ticket is not valid.",
    },
    {
      status: "expired-ticket",
      expectedIconTestId: "error-icon",
      expectedTitle: "Expired Ticket",
      expectedDescription: "This ticket has expired.",
    },
  ];

  testCases.forEach(
    ({ status, expectedTitle, expectedDescription, expectedIconTestId }) => {
      it(`renders correctly for status: ${status}`, () => {
        mockUseManager.mockReturnValue({
          texts: {
            enrolledTitle: "Enrolled Successfully",
            enrolledDescription: "MFA enrollment was successful.",
            alreadyEnrolledTitle: "Already Enrolled",
            alreadyEnrolledDescription: "You are already enrolled in MFA.",
            alreadyUsedTitle: "Link Already Used",
            alreadyUsedDescription: "This link has already been used.",
            invalidTicketTitle: "Invalid Ticket",
            invalidTicketDescription: "This ticket is not valid.",
            expiredTicketTitle: "Expired Ticket",
            expiredTicketDescription: "This ticket has expired.",
            genericError: "Unexpected error occurred",
          },
          data: {
            status,
          },
        });

        render(<Header />);

        // Assert title is shown
        expect(screen.getByText(expectedTitle)).toBeInTheDocument();

        expect(screen.getByText(expectedDescription)).toBeInTheDocument();

        // Assert correct icon is rendered
        expect(screen.getByTestId(expectedIconTestId)).toBeInTheDocument();
      });
    }
  );
});
