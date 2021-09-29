import { extname } from "path";

const mimes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".svg": "image/svg+xml",
};

export default function getContentType(filePath) {
  const ext = extname(filePath);
  return mimes[ext] || "text/plain";
}
