import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import {
  createMockPasskeyEnrollmentLocalInstance,
  MockPasskeyEnrollmentLocalInstance,
} from "@/__mocks__/@auth0/auth0-acul-react/passkey-enrollment-local";

import { usePasskeyEnrollmentLocalManager } from "../hooks/usePasskeyEnrollmentLocalManager";
import PasskeyEnrollmentLocalScreen from "../index";

// Mocking the hook
jest.mock("../hooks/usePasskeyEnrollmentLocalManager", () => ({
  usePasskeyEnrollmentLocalManager: jest.fn(),
}));

describe("PasskeyEnrollmentLocalInstance", () => {
  let mockInstance: MockPasskeyEnrollmentLocalInstance;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // eslint-disable-next-line prefer-const
  mockInstance = createMockPasskeyEnrollmentLocalInstance();

  (usePasskeyEnrollmentLocalManager as jest.Mock).mockReturnValue({
    passkeyEnrollmentLocalInstance: mockInstance,
    continuePasskeyEnrollment: mockInstance.continuePasskeyEnrollment,
    abortPasskeyEnrollment: mockInstance.abortPasskeyEnrollment,
    texts: mockInstance.screen.texts,
    errors: mockInstance.transaction.errors || [],
    data: mockInstance.screen.data,
  });

  it("renders correctly with header, form", () => {
    render(<PasskeyEnrollmentLocalScreen />);

    // Verify the page title is set properly
    expect(document.title).toBe(mockInstance.screen.texts?.pageTitle);
    expect(
      screen.getByText(/Create a passkey for All Applications on this device/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: mockInstance.screen.texts?.createButtonText,
      })
    ).toBeInTheDocument();
  });

  it("displays the Create a new passkey action text and triggers continuePasskeyEnrollment on click", async () => {
    render(<PasskeyEnrollmentLocalScreen />);

    const createClickButton = screen.getByText(
      mockInstance.screen.texts?.createButtonText || "Create a new passkey"
    );

    fireEvent.click(createClickButton);

    await waitFor(() => {
      expect(mockInstance.continuePasskeyEnrollment).toHaveBeenCalled();
    });

    expect(mockInstance.continuePasskeyEnrollment).toHaveBeenCalled();
  });

  it("displays the Create without a new passkey action text and triggers abortPasskeyEnrollment on click", async () => {
    render(<PasskeyEnrollmentLocalScreen />);

    const abortClickButton = screen.getByText(
      mockInstance.screen.texts?.continueButtonText ||
        "Continue without a new passkey"
    );

    fireEvent.click(abortClickButton);

    await waitFor(() => {
      expect(mockInstance.abortPasskeyEnrollment).toHaveBeenCalled();
    });

    expect(mockInstance.abortPasskeyEnrollment).toHaveBeenCalled();
  });

  it("should render correctly and match snapshot", () => {
    // Mocking the hook return values
    (usePasskeyEnrollmentLocalManager as jest.Mock).mockReturnValue({
      passkeyEnrollmentInstance: {},
      texts: { pageTitle: "Enroll Passkey" },
    });

    const { asFragment } = render(<PasskeyEnrollmentLocalScreen />);

    // Snapshot test
    expect(asFragment()).toMatchSnapshot();
  });
});
