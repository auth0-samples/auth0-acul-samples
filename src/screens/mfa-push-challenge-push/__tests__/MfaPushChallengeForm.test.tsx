import { render, screen } from "@testing-library/react";

import MfaPushChallengeForm from "../components/MfaPushChallengeForm";

describe("MfaPushChallengeForm", () => {
  it("renders all expected fields", () => {
    render(<MfaPushChallengeForm />);

    // Check for the presence of specific fields
    expect(
      screen.getByRole("button", { name: /Manually Enter Code/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Resend/i })).toBeInTheDocument();
  });

  it("renders the form title", () => {
    render(<MfaPushChallengeForm />);

    // Check for the form title
    expect(
      screen.getByText(/Didn't receive a notification?/i)
    ).toBeInTheDocument();
  });
});
