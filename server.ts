import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { exec } from "child_process";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.get("/api/download", (req, res) => {
    console.log("Building single HTML file...");
    exec("npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send("Error building the app");
      }
      const filePath = path.resolve(process.cwd(), "dist/index.html");
      if (fs.existsSync(filePath)) {
        res.download(filePath, "escape-room-salario.html");
      } else {
        res.status(404).send("File not found after build");
      }
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
