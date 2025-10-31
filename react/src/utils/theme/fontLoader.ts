export function applyAuth0Font(fontUrl: string | undefined): void {
  if (!fontUrl) return;

  const isValidFont = fontUrl.endsWith(".woff2") || fontUrl.endsWith(".woff");
  if (!isValidFont) {
    console.error("Invalid font format. Only .woff2 and .woff are supported.");
    return;
  }

  const auth0Font = new FontFace(
    "MyCustomFont",
    `url(${fontUrl}) format("woff2")`
  );
  auth0Font
    .load()
    .then(function (loadedFont) {
      document.fonts.add(loadedFont);
      document.body.style.fontFamily = "MyCustomFont";
    })
    .catch(function (error) {
      console.error("Unable to load dynamic font due to error: ", error);
    });
}
