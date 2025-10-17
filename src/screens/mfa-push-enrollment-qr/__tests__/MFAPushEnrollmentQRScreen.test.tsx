import { pickAuthenticator } from "@auth0/auth0-acul-react/mfa-push-enrollment-qr";
import { act, render, screen } from "@testing-library/react";

import { ScreenTestUtils } from "@/test/utils/screen-test-utils";

import MfaPushEnrollmentQRScreen from "../index";

// jest.mock("@/components/qrcode", () => {
//   return {
//     QRCode: jest.fn(() => <div data-testid="mock-qr-code">Mock QR Code</div>),
//   };
// });

describe("MfaPushEnrollmentQRScreen", () => {
  beforeAll(() => {
    Object.assign(window.navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve()),
      },
    });
  });

  const renderScreen = async () => {
    await act(async () => {
      render(<MfaPushEnrollmentQRScreen />);
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render screen with basic structure", async () => {
    await renderScreen();

    expect(screen.getByText("Secure Your Account")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Scan the QR Code below using the Auth0 Guardian app on your mobile device./
      )
    ).toBeInTheDocument();
  });

  it("should call window navigator cliboard write menthod when Copy as code button is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Copy as code/i);

    expect(window.navigator.clipboard.writeText).toHaveBeenCalled();
  });

  it("should call pickAuthenticator when try another method is clicked", async () => {
    await renderScreen();

    await ScreenTestUtils.clickButton(/Try another method/i);

    expect(pickAuthenticator).toHaveBeenCalled();
  });

  // it("should render the mocked QR code", async () => {
  //   await renderScreen();

  //   const qrCode = screen.getByTestId("mock-qr-code");
  //   expect(qrCode).toBeInTheDocument();
  //   expect(qrCode).toHaveTextContent("Mock QR Code");
  // });
});
