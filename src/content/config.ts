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

export const collections = {
	'projects': projectsCollection,
};

