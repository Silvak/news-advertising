import fs from "node:fs/promises";
import express from "express";
import { Transform } from "node:stream";
import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";
import "dotenv/config";

// Constants
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";
const ABORT_DELAY = 10000;

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile("./dist/client/index.html", "utf-8")
  : "";
const ssrManifest = isProduction
  ? await fs.readFile("./dist/client/.vite/ssr-manifest.json", "utf-8")
  : undefined;

// Create http server
const app = express();
app.use(cors());
app.options("*", cors());

// Add Vite or respective production middlewares
let vite;
if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  const compression = (await import("compression")).default;
  const sirv = (await import("sirv")).default;
  app.use(compression());
  app.use(base, sirv("./dist/client", { extensions: [] }));
}

// Proxy
app.use(
  "/api",
  createProxyMiddleware({
    target: process.env.WEB_URL || "https://cnnespanol.cnn.com/",
    changeOrigin: true,
  })
);

/*
// Serve API content
app.get("/noadd", async (req, res) => {
  try {
    const htmlContent = await fs.readFile("./api.html", "utf-8");
    res.send(htmlContent);
  } catch (error) {
    console.error("Error reading API HTML file:", error);
    res.status(500).send("Internal Server Error");
  }
});*/

// Serve HTML for React SSR
app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "");

    let template;
    let render;
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile("./index.html", "utf-8");
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
    } else {
      template = templateHtml;
      render = (await import("./dist/server/entry-server.js")).render;
    }

    let didError = false;

    const { pipe, abort } = render(url, ssrManifest, {
      onShellError() {
        res.status(500);
        res.set({ "Content-Type": "text/html" });
        res.send("<h1>Something went wrong</h1>");
      },
      onShellReady() {
        res.status(didError ? 500 : 200);
        res.set({ "Content-Type": "text/html" });

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            res.write(chunk, encoding);
            callback();
          },
        });

        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`);

        res.write(htmlStart);

        transformStream.on("finish", () => {
          res.end(htmlEnd);
        });

        pipe(transformStream);
      },
      onError(error) {
        didError = true;
        console.error(error);
      },
    });

    setTimeout(() => {
      abort();
    }, ABORT_DELAY);
  } catch (e) {
    vite?.ssrFixStacktrace(e);
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
