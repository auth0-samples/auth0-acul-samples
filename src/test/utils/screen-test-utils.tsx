import { screen, fireEvent, act } from "@testing-library/react";

/**
 * Generic test utilities for Auth0 ACUL screens
 * Can be used across all screens in the application
 */
export class ScreenTestUtils {
  /**
   * Generic helper to fill and submit any form
   */
  static async fillInput(labelPattern: string | RegExp, value: string) {
    const input = screen.getByRole("textbox", { name: labelPattern });
    await act(async () => {
      fireEvent.change(input, { target: { value } });
    });
    return input;
  }

  /**
   * Generic helper to click any button
   */
  static async clickButton(namePattern: string | RegExp) {
    const button = screen.getByRole("button", { name: namePattern });
    await act(async () => {
      fireEvent.click(button);
    });
    return button;
  }

  /**
   * Generic helper to submit a form
   */
  static async submitForm() {
    const form = screen.getByRole("form") || document.querySelector("form");
    if (form) {
      await act(async () => {
        fireEvent.submit(form);
      });
    }
  }

  /**
   * Generic helper to check if element exists
   */
  static elementExists(selector: string): boolean {
    return document.querySelector(selector) !== null;
  }

  /**
   * Generic helper to wait for element
   */
  static async waitForElement(text: string | RegExp) {
    return await screen.findByText(text);
  }
}

/**
 * Mock configuration utilities for Auth0 SDK instances
 * Generic enough to work with any screen type
 */
export class MockConfigUtils {
  /**
   * Configure errors on any mock instance
   */
  static configureErrors(
    mockInstance: any,
    errors: Array<{ message: string; field?: string }>,
  ) {
    if (!mockInstance.transaction) {
      mockInstance.transaction = {};
    }
    mockInstance.transaction.errors = errors;
    // Also configure getError() method to return the same errors
    mockInstance.getError.mockReturnValue(errors);
  }

  /**
   * Configure screen texts on any mock instance
   */
  static configureTexts(mockInstance: any, texts: Record<string, string>) {
    if (!mockInstance.screen) {
      mockInstance.screen = {};
    }
    if (!mockInstance.screen.texts) {
      mockInstance.screen.texts = {};
    }
    Object.assign(mockInstance.screen.texts, texts);
  }

  /**
   * Configure screen data on any mock instance
   */
  static configureScreenData(mockInstance: any, data: Record<string, any>) {
    if (!mockInstance.screen) {
      mockInstance.screen = {};
    }
    if (!mockInstance.screen.data) {
      mockInstance.screen.data = {};
    }
    Object.assign(mockInstance.screen.data, data);
  }

  /**
   * Configure transaction data on any mock instance
   */
  static configureTransaction(
    mockInstance: any,
    transaction: Record<string, any>,
  ) {
    if (!mockInstance.transaction) {
      mockInstance.transaction = {};
    }
    Object.assign(mockInstance.transaction, transaction);
  }
}
