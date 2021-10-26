import PbRoute from "./pb-route.js";

const stylesheet = new CSSStyleSheet();

stylesheet.insertRule(`
  ${PbRoute.name}
  {
    display: contents;
  }
`);

document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
