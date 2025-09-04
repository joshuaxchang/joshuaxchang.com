// src/content/config.ts
// This file defines the structure for the article content.

import { defineCollection, z } from 'astro:content';

// Import `image` from the schema helper
const articlesCollection = defineCollection({
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date().optional(),
		thumbnail: image().optional(),
	}),
});

export const collections = {
	'articles': articlesCollection,
};

