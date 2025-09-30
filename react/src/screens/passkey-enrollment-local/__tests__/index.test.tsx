import { fireEvent, render, screen } from "@testing-library/react";

import { usePasskeyEnrollmentLocalManager } from "../hooks/usePasskeyEnrollmentLocalManager";
import PasskeyEnrollmentLocalScreen from "../index";

// Mocking the hook
jest.mock("../hooks/usePasskeyEnrollmentLocalManager", () => ({
  usePasskeyEnrollmentLocalManager: jest.fn(),
}));

describe("PasskeyEnrollmentLocalScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call usePasskeyEnrollmentLocalManager", () => {
    (usePasskeyEnrollmentLocalManager as jest.Mock).mockReturnValue({
      passkeyEnrollmentLocalInstance: {},
      texts: {},
    });

    render(<PasskeyEnrollmentLocalScreen />);
    expect(usePasskeyEnrollmentLocalManager).toHaveBeenCalled();
  });

  it("should render correctly and match snapshot", () => {
    // Mocking the hook return values
    (usePasskeyEnrollmentLocalManager as jest.Mock).mockReturnValue({
      passkeyEnrollmentLocalInstance: {},
      texts: { pageTitle: "Enroll Passkey" },
    });

    const { asFragment } = render(<PasskeyEnrollmentLocalScreen />);

    // Snapshot test
    expect(asFragment()).toMatchSnapshot();
  });

  it("should set the document title based on texts.pageTitle", () => {
    (usePasskeyEnrollmentLocalManager as jest.Mock).mockReturnValue({
      passkeyEnrollmentLocalInstance: {},
      texts: { pageTitle: "Enroll Passkey" },
    });

    render(<PasskeyEnrollmentLocalScreen />);

    // Verify document title
    expect(document.title).toBe("Enroll Passkey");
  });

  it("should render the Create a new Passkey button and call onCreateClick when clicked", () => {
    const mockOnCreateClick = jest.fn();

    (usePasskeyEnrollmentLocalManager as jest.Mock).mockReturnValue({
      continuePasskeyEnrollment: mockOnCreateClick,
      texts: { createButtonText: "Create a new passkey" },
    });

    render(<PasskeyEnrollmentLocalScreen />);

    const button = screen.getByText("Create a new passkey");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOnCreateClick).toHaveBeenCalledWith({ key: "passkey" });
  });
});
