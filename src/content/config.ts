// src/content/config.ts
// This file defines the structure for the project content.

import { defineCollection, z } from 'astro:content';

// Import `image` from the schema helper
const projectsCollection = defineCollection({
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date().optional(),
		thumbnail: image().optional(),
	}),
});

// This collection is for your category pages (3D modeling, PCB, etc.)
const camphoraCollection = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		order: z.number().optional(), 
	}),
});

export const collections = {
	'projects': projectsCollection,
	'camphora': camphoraCollection,
};

