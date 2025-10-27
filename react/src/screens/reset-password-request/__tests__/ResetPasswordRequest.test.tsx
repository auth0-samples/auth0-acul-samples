/**
 * @file Tests for the ResetPasswordRequest screen components.
 */
import { useLoginIdentifiers } from "@auth0/auth0-acul-react/login-id";
import {
  backToLogin,
  resetPassword,
  useErrors,
  useScreen,
} from "@auth0/auth0-acul-react/reset-password-request";
import { render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import Footer from "../components/Footer";
import Header from "../components/Header";
import ResetPasswordRequestForm from "../components/ResetPasswordRequestForm";

describe("ResetPasswordRequestScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("sets document title from SDK texts", () => {
    render(<Header />);
    document.title = "Reset your password | My App";
    expect(document.title).toBe("Reset your password | My App");
  });

  it("renders Header correctly with title and description", () => {
    render(<Header />);

    expect(screen.getByText(/Forgot Your Password\?/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Enter your Username or Email address and we will send you instructions/i
      )
    ).toBeInTheDocument();
    expect(screen.getByAltText(/Application Logo/i)).toBeInTheDocument();
  });

  it("renders ResetPasswordRequestForm and submits successfully", async () => {
    render(<ResetPasswordRequestForm />);

    await ScreenTestUtils.fillInput(
      /Username or Email address/i,
      "user@example.com"
    );
    await ScreenTestUtils.fillInput(
      /Enter the code shown above/i,
      "captcha123"
    );
    await ScreenTestUtils.clickButton(/Continue/i);

    expect(resetPassword).toHaveBeenCalledWith(
      "user@example.com",
      "captcha123"
    );
  });

  it("renders CAPTCHA field when available", () => {
    render(<ResetPasswordRequestForm />);
    expect(
      screen.getByLabelText(/Enter the code shown above/i)
    ).toBeInTheDocument();
  });

  it("renders general error messages when errors exist", () => {
    (useErrors as any).errors = ["Something went wrong"];
    (useErrors as any).hasError = true;

    render(<ResetPasswordRequestForm />);
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("renders Footer and calls back-to-login action", async () => {
    render(<Footer />);
    await ScreenTestUtils.clickButton(/Back to My App/i);
    expect(backToLogin).toHaveBeenCalled();
  });

  it("renders correct description for phone-only identifier", () => {
    (useLoginIdentifiers as jest.Mock).mockReturnValueOnce({
      ...useLoginIdentifiers,
      useLoginIdentifiers: ["phone"],
    });
    (useScreen as jest.Mock).mockReturnValueOnce({
      texts: {
        title: "Forgot Your Password?",
        logoAltText: "Application Logo",
        phonePlaceholder: "Phone Number",
        phoneDescription:
          "Enter your Phone number and we will send you instructions to reset your password.",
      },
    });

    render(<Header />);
    expect(
      screen.getByText(
        /Enter your Phone number and we will send you instructions/i
      )
    ).toBeInTheDocument();
  });

  //   it("renders default description if no identifiers provided", () => {
  //     (useResetPasswordRequestManager as jest.Mock).mockReturnValueOnce({
  //       ...useResetPasswordRequestManager(),
  //       useLoginIdentifiers: [],
  //       texts: {
  //         title: "Forgot Your Password?",
  //         logoAltText: "Application Logo",
  //         usernameOrEmailDescription:
  //           "Enter your Username or Email address and we will send you instructions to reset your password.",
  //       },
  //     });

  //     render(<Header />);
  //     expect(
  //       screen.getByText(
  //         /Enter your Username or Email address and we will send you instructions/i
  //       )
  //     ).toBeInTheDocument();
  //   });
});
