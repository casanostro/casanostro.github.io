// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/data/projects.json
var projects_default = [
  {
    id: 1,
    title: "Samsung Electronics France",
    slug: "samsung-electronics",
    description: "Supply Chain & Operations Project Manager (Oct. 2024 \u2013 Pr\xE9sent). Automatisation des flux de commandes, optimisation des KPI, d\xE9veloppement de dashboards en VBA/Python.",
    image: "https://images.unsplash.com/photo-1563770660941-10e05f10deda?q=80&w=500&h=300&fit=crop",
    badge: "ACTUEL",
    badgeColor: "pip-green",
    tags: ["Supply Chain", "Automatisation", "Python", "KPI"],
    projectUrl: "#",
    sourceUrl: "#"
  },
  {
    id: 2,
    title: "Oplit",
    slug: "oplit",
    description: "Chef de projet MOA (Sept. 2023 - Sept. 2024). Optimisation des processus logistiques, d\xE9ploiement de solution SaaS, int\xE9gration d'API pour la communication inter-entreprise.",
    image: "https://images.unsplash.com/photo-1566669437687-7040a6926753?q=80&w=500&h=300&fit=crop",
    badge: "2023-2024",
    badgeColor: "pip-amber",
    tags: ["MOA", "SaaS", "API", "Logistique"],
    projectUrl: "#",
    sourceUrl: "#"
  },
  {
    id: 3,
    title: "Arvato BU Healthcare",
    slug: "arvato-healthcare",
    description: "COO Adjoint (Sept. 2022 - Sept. 2023). Optimisation du flux convoyeurs, d\xE9ploiement de tableaux de bord Power BI, pilotage d'un drone inventoriste autonome.",
    image: "https://images.unsplash.com/photo-1516906571665-49af58989c4e?q=80&w=500&h=300&fit=crop",
    badge: "2022-2023",
    badgeColor: "pip-amber",
    tags: ["Power BI", "Lean", "Supply Chain", "IA"],
    projectUrl: "#",
    sourceUrl: "#"
  },
  {
    id: 4,
    title: "Groupe Servia",
    slug: "groupe-servia",
    description: "Adjoint directeur logistique (Sept. 2020 - Juillet 2022). Augmentation de la capacit\xE9 de stockage, r\xE9duction des temps de pr\xE9paration, impl\xE9mentation d'un WMS.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=500&h=300&fit=crop",
    badge: "2020-2022",
    badgeColor: "pip-amber",
    tags: ["WMS", "Logistique", "Optimisation", "ROI"],
    projectUrl: "#",
    sourceUrl: "#"
  }
];

// server/storage.ts
var MemStorage = class {
  users;
  projects;
  userCurrentId;
  projectCurrentId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.projects = /* @__PURE__ */ new Map();
    this.userCurrentId = 1;
    this.projectCurrentId = 1;
    this.initializeProjects();
  }
  initializeProjects() {
    projects_default.forEach((project) => {
      this.projects.set(project.id, project);
      if (project.id >= this.projectCurrentId) {
        this.projectCurrentId = project.id + 1;
      }
    });
  }
  async getAllProjects() {
    return Array.from(this.projects.values());
  }
  async getProjectById(id) {
    return this.projects.get(id);
  }
  async getProjectBySlug(slug) {
    return Array.from(this.projects.values()).find(
      (project) => project.slug === slug
    );
  }
  async createProject(insertProject) {
    const id = this.projectCurrentId++;
    const project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userCurrentId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
};
var storage = new MemStorage();

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects" });
    }
  });
  app2.get("/api/projects/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project" });
    }
  });
  app2.get("/api/projects/slug/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const project = await storage.getProjectBySlug(slug);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project" });
    }
  });
  app2.post("/api/contact", (req, res) => {
    try {
      const { name, email, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({
          message: "Missing required fields"
        });
      }
      res.status(200).json({
        message: "Message received! Thank you for your contact request."
      });
    } catch (error) {
      res.status(500).json({
        message: "Error processing contact request"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "/casanostro.github.io/",
  // très important !
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen(port, "localhost", () => {
    log(`serving on http://localhost:${port}`);
  });
})();
