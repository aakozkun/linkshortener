import { index, integer, pgTable, text, timestamp, uniqueIndex } from 'drizzle-orm/pg-core';

export const links = pgTable(
	'links',
	{
		id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
		clerkUserId: text('clerk_user_id').notNull(),
		shortCode: text('short_code').notNull(),
		url: text('url').notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [
		uniqueIndex('links_short_code_unique').on(table.shortCode),
		index('links_clerk_user_id_idx').on(table.clerkUserId),
	],
);
