import type {
  ScreenMembersOnMfaEnrollResult,
  TransactionMembers,
} from "@auth0/auth0-acul-react/types";

export interface MockMfaEnrollResultInstance {
  screen: ScreenMembersOnMfaEnrollResult;
  transaction: TransactionMembers;
}

export const createMockMfaEnrollResultInstance =
  (): MockMfaEnrollResultInstance => ({
    screen: {
      name: "mfa-enroll-result",
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
        status: "success", // override in test
      },
      captchaImage: null,
      captchaSiteKey: null,
      captchaProvider: null,
      isCaptchaAvailable: false,
      links: null,
      captcha: null,
    },
    transaction: {
      hasErrors: false,
      errors: [],
      state: "mock-state",
      locale: "en",
      countryCode: null,
      countryPrefix: null,
      connectionStrategy: null,
      currentConnection: null,
      alternateConnections: null,
    },
  });

const mockInstance = createMockMfaEnrollResultInstance();

export const useMfaEnrollResultManager = jest.fn(() => ({
  texts: mockInstance.screen.texts,
  data: mockInstance.screen.data,
}));

export default jest
  .fn()
  .mockImplementation(() => createMockMfaEnrollResultInstance());
