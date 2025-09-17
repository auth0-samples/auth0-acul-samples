import { fireEvent, render, screen } from "@testing-library/react";

import { usePasskeyEnrollmentManager } from "../hooks/usePasskeyEnrollmentManager";
import PasskeyEnrollmentScreen from "../index";

// Mocking the hook
jest.mock("../hooks/usePasskeyEnrollmentManager", () => ({
  usePasskeyEnrollmentManager: jest.fn(),
}));

describe("PasskeyEnrollmentScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call usePasskeyEnrollmentManager", () => {
    (usePasskeyEnrollmentManager as jest.Mock).mockReturnValue({
      passkeyEnrollmentInstance: {},
      texts: {},
    });

    render(<PasskeyEnrollmentScreen />);
    expect(usePasskeyEnrollmentManager).toHaveBeenCalled();
  });

  it("should render correctly and match snapshot", () => {
    // Mocking the hook return values
    (usePasskeyEnrollmentManager as jest.Mock).mockReturnValue({
      passkeyEnrollmentInstance: {},
      texts: { pageTitle: "Enroll Passkey" },
    });

    const { asFragment } = render(<PasskeyEnrollmentScreen />);

    // Snapshot test
    expect(asFragment()).toMatchSnapshot();
  });

  it("should set the document title based on texts.pageTitle", () => {
    (usePasskeyEnrollmentManager as jest.Mock).mockReturnValue({
      passkeyEnrollmentInstance: {},
      texts: { pageTitle: "Enroll Passkey" },
    });

    render(<PasskeyEnrollmentScreen />);

    // Verify document title
    expect(document.title).toBe("Enroll Passkey");
  });

  it("should render the Create Passkey button and call onCreateClick when clicked", () => {
    const mockOnCreateClick = jest.fn();

    (usePasskeyEnrollmentManager as jest.Mock).mockReturnValue({
      continuePasskeyEnrollment: mockOnCreateClick,
      texts: { createButtonText: "Create a passkey" },
    });

    render(<PasskeyEnrollmentScreen />);

    const button = screen.getByText("Create a passkey");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockOnCreateClick).toHaveBeenCalledWith({ key: "passkey" });
  });
});
