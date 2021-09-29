import { URL } from "url";
import { createServer } from "http";
import { stat, readFile } from "fs/promises";
import getContentType from "./getContentType.js";

const PORT = 8080;
const INDEX = "./src/index.html";

createServer((request, response) => {
  const url = new URL(`http://${request.headers.host}${request.url}`);
  let filePath = `./src${url.pathname}`;

  stat(filePath)
    .then((stats) => {
      if (stats.isDirectory()) {
        throw new Error("IS_DIR");
      }
    })
    .catch(() => {
      filePath = INDEX;
    })
    .finally(() => {
      console.log(`${url.href} -> ${filePath}`);
      const contentType = getContentType(filePath);
      readFile(filePath)
        .then((content) => {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(content);
        })
        .catch((error) => {
          response.writeHead(500, { "Content-Type": "text/plain" });
          response.end(error.message, "utf-8");
        });
    });
}).listen(PORT);
