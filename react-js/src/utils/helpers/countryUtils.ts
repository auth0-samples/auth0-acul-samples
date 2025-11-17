/**
 * Utility functions for handling country code data from Auth0 SDK
 */
const COUNTRY_DATA: Record<string, { name: string; flag: string }> = {
  AD: { name: "Andorra", flag: "🇦🇩" },
  AE: { name: "United Arab Emirates", flag: "🇦🇪" },
  AF: { name: "Afghanistan", flag: "🇦🇫" },
  AG: { name: "Antigua and Barbuda", flag: "🇦🇬" },
  AI: { name: "Anguilla", flag: "🇦🇮" },
  AL: { name: "Albania", flag: "🇦🇱" },
  AM: { name: "Armenia", flag: "🇦🇲" },
  AO: { name: "Angola", flag: "🇦🇴" },
  AQ: { name: "Antarctica", flag: "🇦🇶" },
  AR: { name: "Argentina", flag: "🇦🇷" },
  AS: { name: "American Samoa", flag: "🇦🇸" },
  AT: { name: "Austria", flag: "🇦🇹" },
  AU: { name: "Australia", flag: "🇦🇺" },
  AW: { name: "Aruba", flag: "🇦🇼" },
  AX: { name: "Åland Islands", flag: "🇦🇽" },
  AZ: { name: "Azerbaijan", flag: "🇦🇿" },
  BA: { name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  BB: { name: "Barbados", flag: "🇧🇧" },
  BD: { name: "Bangladesh", flag: "🇧🇩" },
  BE: { name: "Belgium", flag: "🇧🇪" },
  BF: { name: "Burkina Faso", flag: "🇧🇫" },
  BG: { name: "Bulgaria", flag: "🇧🇬" },
  BH: { name: "Bahrain", flag: "🇧🇭" },
  BI: { name: "Burundi", flag: "🇧🇮" },
  BJ: { name: "Benin", flag: "🇧🇯" },
  BL: { name: "Saint Barthélemy", flag: "🇧🇱" },
  BM: { name: "Bermuda", flag: "🇧🇲" },
  BN: { name: "Brunei Darussalam", flag: "🇧🇳" },
  BO: { name: "Bolivia, Plurinational State of", flag: "🇧🇴" },
  BQ: { name: "Bonaire, Sint Eustatius and Saba", flag: "🇧🇶" },
  BR: { name: "Brazil", flag: "🇧🇷" },
  BS: { name: "Bahamas", flag: "🇧🇸" },
  BT: { name: "Bhutan", flag: "🇧🇹" },
  BV: { name: "Bouvet Island", flag: "🇧🇻" },
  BW: { name: "Botswana", flag: "🇧🇼" },
  BY: { name: "Belarus", flag: "🇧🇾" },
  BZ: { name: "Belize", flag: "🇧🇿" },
  CA: { name: "Canada", flag: "🇨🇦" },
  CC: { name: "Cocos (Keeling) Islands", flag: "🇨🇨" },
  CD: { name: "Congo, the Democratic Republic of the", flag: "🇨🇩" },
  CF: { name: "Central African Republic", flag: "🇨🇫" },
  CG: { name: "Congo", flag: "🇨🇬" },
  CH: { name: "Switzerland", flag: "🇨🇭" },
  CI: { name: "Côte d'Ivoire", flag: "🇨🇮" },
  CK: { name: "Cook Islands", flag: "🇨🇰" },
  CL: { name: "Chile", flag: "🇨🇱" },
  CM: { name: "Cameroon", flag: "🇨🇲" },
  CN: { name: "China", flag: "🇨🇳" },
  CO: { name: "Colombia", flag: "🇨🇴" },
  CR: { name: "Costa Rica", flag: "🇨🇷" },
  CU: { name: "Cuba", flag: "🇨🇺" },
  CV: { name: "Cape Verde", flag: "🇨🇻" },
  CW: { name: "Curaçao", flag: "🇨🇼" },
  CX: { name: "Christmas Island", flag: "🇨🇽" },
  CY: { name: "Cyprus", flag: "🇨🇾" },
  CZ: { name: "Czech Republic", flag: "🇨🇿" },
  DE: { name: "Germany", flag: "🇩🇪" },
  DJ: { name: "Djibouti", flag: "🇩🇯" },
  DK: { name: "Denmark", flag: "🇩🇰" },
  DM: { name: "Dominica", flag: "🇩🇲" },
  DO: { name: "Dominican Republic", flag: "🇩🇴" },
  DZ: { name: "Algeria", flag: "🇩🇿" },
  EC: { name: "Ecuador", flag: "🇪🇨" },
  EE: { name: "Estonia", flag: "🇪🇪" },
  EG: { name: "Egypt", flag: "🇪🇬" },
  EH: { name: "Western Sahara", flag: "🇪🇭" },
  ER: { name: "Eritrea", flag: "🇪🇷" },
  ES: { name: "Spain", flag: "🇪🇸" },
  ET: { name: "Ethiopia", flag: "🇪🇹" },
  FI: { name: "Finland", flag: "🇫🇮" },
  FJ: { name: "Fiji", flag: "🇫🇯" },
  FK: { name: "Falkland Islands (Malvinas)", flag: "🇫🇰" },
  FM: { name: "Micronesia, Federated States of", flag: "🇫🇲" },
  FO: { name: "Faroe Islands", flag: "🇫🇴" },
  FR: { name: "France", flag: "🇫🇷" },
  GA: { name: "Gabon", flag: "🇬🇦" },
  GB: { name: "United Kingdom", flag: "🇬🇧" },
  GD: { name: "Grenada", flag: "🇬🇩" },
  GE: { name: "Georgia", flag: "🇬🇪" },
  GF: { name: "French Guiana", flag: "🇬🇫" },
  GG: { name: "Guernsey", flag: "🇬🇬" },
  GH: { name: "Ghana", flag: "🇬🇭" },
  GI: { name: "Gibraltar", flag: "🇬🇮" },
  GL: { name: "Greenland", flag: "🇬🇱" },
  GM: { name: "Gambia", flag: "🇬🇲" },
  GN: { name: "Guinea", flag: "🇬🇳" },
  GP: { name: "Guadeloupe", flag: "🇬🇵" },
  GQ: { name: "Equatorial Guinea", flag: "🇬🇶" },
  GR: { name: "Greece", flag: "🇬🇷" },
  GS: { name: "South Georgia and the South Sandwich Islands", flag: "🇬🇸" },
  GT: { name: "Guatemala", flag: "🇬🇹" },
  GU: { name: "Guam", flag: "🇬🇺" },
  GW: { name: "Guinea-Bissau", flag: "🇬🇼" },
  GY: { name: "Guyana", flag: "🇬🇾" },
  HK: { name: "Hong Kong", flag: "🇭🇰" },
  HM: { name: "Heard Island and McDonald Islands", flag: "🇭🇲" },
  HN: { name: "Honduras", flag: "🇭🇳" },
  HR: { name: "Croatia", flag: "🇭🇷" },
  HT: { name: "Haiti", flag: "🇭🇹" },
  HU: { name: "Hungary", flag: "🇭🇺" },
  ID: { name: "Indonesia", flag: "🇮🇩" },
  IE: { name: "Ireland", flag: "🇮🇪" },
  IL: { name: "Israel", flag: "🇮🇱" },
  IM: { name: "Isle of Man", flag: "🇮🇲" },
  IN: { name: "India", flag: "🇮🇳" },
  IO: { name: "British Indian Ocean Territory", flag: "🇮🇴" },
  IQ: { name: "Iraq", flag: "🇮🇶" },
  IR: { name: "Iran, Islamic Republic of", flag: "🇮🇷" },
  IS: { name: "Iceland", flag: "🇮🇸" },
  IT: { name: "Italy", flag: "🇮🇹" },
  JE: { name: "Jersey", flag: "🇯🇪" },
  JM: { name: "Jamaica", flag: "🇯🇲" },
  JO: { name: "Jordan", flag: "🇯🇴" },
  JP: { name: "Japan", flag: "🇯🇵" },
  KE: { name: "Kenya", flag: "🇰🇪" },
  KG: { name: "Kyrgyzstan", flag: "🇰🇬" },
  KH: { name: "Cambodia", flag: "🇰🇭" },
  KI: { name: "Kiribati", flag: "🇰🇮" },
  KM: { name: "Comoros", flag: "🇰🇲" },
  KN: { name: "Saint Kitts and Nevis", flag: "🇰🇳" },
  KP: { name: "Korea, Democratic People's Republic of", flag: "🇰🇵" },
  KR: { name: "Korea, Republic of", flag: "🇰🇷" },
  KW: { name: "Kuwait", flag: "🇰🇼" },
  KY: { name: "Cayman Islands", flag: "🇰🇾" },
  KZ: { name: "Kazakhstan", flag: "🇰🇿" },
  LA: { name: "Lao People's Democratic Republic", flag: "🇱🇦" },
  LB: { name: "Lebanon", flag: "🇱🇧" },
  LC: { name: "Saint Lucia", flag: "🇱🇨" },
  LI: { name: "Liechtenstein", flag: "🇱🇮" },
  LK: { name: "Sri Lanka", flag: "🇱🇰" },
  LR: { name: "Liberia", flag: "🇱🇷" },
  LS: { name: "Lesotho", flag: "🇱🇸" },
  LT: { name: "Lithuania", flag: "🇱🇹" },
  LU: { name: "Luxembourg", flag: "🇱🇺" },
  LV: { name: "Latvia", flag: "🇱🇻" },
  LY: { name: "Libya", flag: "🇱🇾" },
  MA: { name: "Morocco", flag: "🇲🇦" },
  MC: { name: "Monaco", flag: "🇲🇨" },
  MD: { name: "Moldova, Republic of", flag: "🇲🇩" },
  ME: { name: "Montenegro", flag: "🇲🇪" },
  MF: { name: "Saint Martin (French part)", flag: "🇲🇫" },
  MG: { name: "Madagascar", flag: "🇲🇬" },
  MH: { name: "Marshall Islands", flag: "🇲🇭" },
  MK: { name: "Macedonia, the former Yugoslav Republic of", flag: "🇲🇰" },
  ML: { name: "Mali", flag: "🇲🇱" },
  MM: { name: "Myanmar", flag: "🇲🇲" },
  MN: { name: "Mongolia", flag: "🇲🇳" },
  MO: { name: "Macao", flag: "🇲🇴" },
  MP: { name: "Northern Mariana Islands", flag: "🇲🇵" },
  MQ: { name: "Martinique", flag: "🇲🇶" },
  MR: { name: "Mauritania", flag: "🇲🇷" },
  MS: { name: "Montserrat", flag: "🇲🇸" },
  MT: { name: "Malta", flag: "🇲🇹" },
  MU: { name: "Mauritius", flag: "🇲🇺" },
  MV: { name: "Maldives", flag: "🇲🇻" },
  MW: { name: "Malawi", flag: "🇲🇼" },
  MX: { name: "Mexico", flag: "🇲🇽" },
  MY: { name: "Malaysia", flag: "🇲🇾" },
  MZ: { name: "Mozambique", flag: "🇲🇿" },
  NA: { name: "Namibia", flag: "🇳🇦" },
  NC: { name: "New Caledonia", flag: "🇳🇨" },
  NE: { name: "Niger", flag: "🇳🇪" },
  NF: { name: "Norfolk Island", flag: "🇳🇫" },
  NG: { name: "Nigeria", flag: "🇳🇬" },
  NI: { name: "Nicaragua", flag: "🇳🇮" },
  NL: { name: "Netherlands", flag: "🇳🇱" },
  NO: { name: "Norway", flag: "🇳🇴" },
  NP: { name: "Nepal", flag: "🇳🇵" },
  NR: { name: "Nauru", flag: "🇳🇷" },
  NU: { name: "Niue", flag: "🇳🇺" },
  NZ: { name: "New Zealand", flag: "🇳🇿" },
  OM: { name: "Oman", flag: "🇴🇲" },
  PA: { name: "Panama", flag: "🇵🇦" },
  PE: { name: "Peru", flag: "🇵🇪" },
  PF: { name: "French Polynesia", flag: "🇵🇫" },
  PG: { name: "Papua New Guinea", flag: "🇵🇬" },
  PH: { name: "Philippines", flag: "🇵🇭" },
  PK: { name: "Pakistan", flag: "🇵🇰" },
  PL: { name: "Poland", flag: "🇵🇱" },
  PM: { name: "Saint Pierre and Miquelon", flag: "🇵🇲" },
  PN: { name: "Pitcairn", flag: "🇵🇳" },
  PR: { name: "Puerto Rico", flag: "🇵🇷" },
  PS: { name: "Palestine, State of", flag: "🇵🇸" },
  PT: { name: "Portugal", flag: "🇵🇹" },
  PW: { name: "Palau", flag: "🇵🇼" },
  PY: { name: "Paraguay", flag: "🇵🇾" },
  QA: { name: "Qatar", flag: "🇶🇦" },
  RE: { name: "Réunion", flag: "🇷🇪" },
  RO: { name: "Romania", flag: "🇷🇴" },
  RS: { name: "Serbia", flag: "🇷🇸" },
  RU: { name: "Russian Federation", flag: "🇷🇺" },
  RW: { name: "Rwanda", flag: "🇷🇼" },
  SA: { name: "Saudi Arabia", flag: "🇸🇦" },
  SB: { name: "Solomon Islands", flag: "🇸🇧" },
  SC: { name: "Seychelles", flag: "🇸🇨" },
  SD: { name: "Sudan", flag: "🇸🇩" },
  SE: { name: "Sweden", flag: "🇸🇪" },
  SG: { name: "Singapore", flag: "🇸🇬" },
  SH: { name: "Saint Helena, Ascension and Tristan da Cunha", flag: "🇸🇭" },
  SI: { name: "Slovenia", flag: "🇸🇮" },
  SJ: { name: "Svalbard and Jan Mayen", flag: "🇸🇯" },
  SK: { name: "Slovakia", flag: "🇸🇰" },
  SL: { name: "Sierra Leone", flag: "🇸🇱" },
  SM: { name: "San Marino", flag: "🇸🇲" },
  SN: { name: "Senegal", flag: "🇸🇳" },
  SO: { name: "Somalia", flag: "🇸🇴" },
  SR: { name: "Suriname", flag: "🇸🇷" },
  SS: { name: "South Sudan", flag: "🇸🇸" },
  ST: { name: "Sao Tome and Principe", flag: "🇸🇹" },
  SV: { name: "El Salvador", flag: "🇸🇻" },
  SX: { name: "Sint Maarten (Dutch part)", flag: "🇸🇽" },
  SY: { name: "Syrian Arab Republic", flag: "🇸🇾" },
  SZ: { name: "Swaziland", flag: "🇸🇿" },
  TC: { name: "Turks and Caicos Islands", flag: "🇹🇨" },
  TD: { name: "Chad", flag: "🇹🇩" },
  TF: { name: "French Southern Territories", flag: "🇹🇫" },
  TG: { name: "Togo", flag: "🇹🇬" },
  TH: { name: "Thailand", flag: "🇹🇭" },
  TJ: { name: "Tajikistan", flag: "🇹🇯" },
  TK: { name: "Tokelau", flag: "🇹🇰" },
  TL: { name: "Timor-Leste", flag: "🇹🇱" },
  TM: { name: "Turkmenistan", flag: "🇹🇲" },
  TN: { name: "Tunisia", flag: "🇹🇳" },
  TO: { name: "Tonga", flag: "🇹🇴" },
  TR: { name: "Turkey", flag: "🇹🇷" },
  TT: { name: "Trinidad and Tobago", flag: "🇹🇹" },
  TV: { name: "Tuvalu", flag: "🇹🇻" },
  TW: { name: "Taiwan, Province of China", flag: "🇹🇼" },
  TZ: { name: "Tanzania, United Republic of", flag: "🇹🇿" },
  UA: { name: "Ukraine", flag: "🇺🇦" },
  UG: { name: "Uganda", flag: "🇺🇬" },
  UM: { name: "United States Minor Outlying Islands", flag: "🇺🇲" },
  US: { name: "United States", flag: "🇺🇸" },
  UY: { name: "Uruguay", flag: "🇺🇾" },
  UZ: { name: "Uzbekistan", flag: "🇺🇿" },
  VA: { name: "Holy See (Vatican City State)", flag: "🇻🇦" },
  VC: { name: "Saint Vincent and the Grenadines", flag: "🇻🇨" },
  VE: { name: "Venezuela, Bolivarian Republic of", flag: "🇻🇪" },
  VG: { name: "Virgin Islands, British", flag: "🇻🇬" },
  VI: { name: "Virgin Islands, U.S.", flag: "🇻🇮" },
  VN: { name: "Viet Nam", flag: "🇻🇳" },
  VU: { name: "Vanuatu", flag: "🇻🇺" },
  WF: { name: "Wallis and Futuna", flag: "🇼🇫" },
  WS: { name: "Samoa", flag: "🇼🇸" },
  YE: { name: "Yemen", flag: "🇾🇪" },
  YT: { name: "Mayotte", flag: "🇾🇹" },
  ZA: { name: "South Africa", flag: "🇿🇦" },
  ZM: { name: "Zambia", flag: "🇿🇲" },
  ZW: { name: "Zimbabwe", flag: "🇿🇼" },
};

/**
 * Auth0 SDK country code structure from TransactionMembersOnLoginId
 */
export interface Auth0CountryCode {
  code: string; // Country code like "IN", "US"
  prefix: string; // Phone prefix like "91", "1"
}

/**
 * Alternative structure that might be in mock data or different SDK versions
 */
export interface Auth0CountryCodeAlt {
  countryCode: string;
  countryPrefix: string;
}

export interface CountryCodePickerData {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
}

export function transformAuth0CountryCode(
  countryCode: string | null | undefined,
  countryPrefix?: string | null | undefined
): CountryCodePickerData | undefined {
  if (!countryCode) {
    return undefined;
  }

  const countryInfo = COUNTRY_DATA[countryCode];

  if (!countryInfo) {
    // Fallback for unknown country codes
    return {
      name: `Country ${countryCode}`,
      code: countryCode,
      dialCode: countryPrefix ? `+${countryPrefix}` : "+??",
      flag: "🏳️", // Generic flag
    };
  }

  return {
    name: countryInfo.name,
    code: countryCode,
    dialCode: countryPrefix ? `+${countryPrefix}` : "+??",
    flag: countryInfo.flag,
  };
}

/**
 * Checks if country picker should be shown - only when phone is the ONLY identifier option
 * @param identifiers - Array of allowed identifier types
 * @returns boolean indicating if country picker should be displayed
 */
export function isPhoneNumberSupported(identifiers: string[]): boolean {
  // Show country picker only when phone is the sole identifier option
  return (
    identifiers.length === 1 &&
    identifiers.some((identifier) => identifier.toLowerCase().includes("phone"))
  );
}

export function getCountryName(countryCode: string): string {
  return COUNTRY_DATA[countryCode]?.name || `Country ${countryCode}`;
}

export function getCountryFlag(countryCode: string): string {
  return COUNTRY_DATA[countryCode]?.flag || "🏳️";
}
