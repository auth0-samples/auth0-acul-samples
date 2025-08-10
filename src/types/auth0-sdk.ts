import type {
  BrandingMembers,
  OrganizationMembers,
  ScreenMembers,
  TransactionMembers,
} from "@auth0/auth0-acul-js";

/**
 * Defines the core structure of the Auth0 Universal Login context object.
 * This interface is built from the `Base` members of the ACUL JS SDK
 * and serves as the primary, strongly-typed entry point for interacting
 * with the SDK's data.
 *
 * @see https://auth0.github.io/universal-login/modules/Interfaces.Base.html
 */
export interface UniversalLoginContext {
  branding: BrandingMembers;
  organization?: OrganizationMembers;
  screen: ScreenMembers;
  transaction: TransactionMembers;
  // Add other base members as needed.
}
