import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Orbit — Alumni Intelligence",
    short_name: "Orbit",
    description: "A private relationship intelligence network for alumni communities.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#0d100d",
    theme_color: "#0d100d",
    categories: ["social", "business", "education", "productivity"],
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Command Center", short_name: "Home", url: "/app" },
      { name: "Alumni Directory", short_name: "People", url: "/app/directory" },
      { name: "Events", short_name: "Events", url: "/app/events" },
      { name: "Opportunities", short_name: "Roles", url: "/app/opportunities" },
    ],
  };
}
