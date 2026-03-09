// src/content/config.ts
import { defineCollection, z } from "astro:content";

const blogCollection = defineCollection({
  type: "content", // indica que usaremos archivos .md o .mdx
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // convierte strings de fecha a objetos Date
    image: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().optional().default(false),
  }),
});

// Exportamos las colecciones para que Astro las reconozca
export const collections = {
  blog: blogCollection,
};
