import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const usersTable = sqliteTable('users', {
    id: integer('id').primaryKey(),
    name: text('name'),
    email: text('email'),
    password: text('password')
})

export const eventsTable = sqliteTable('events', {
    id: integer('id').primaryKey(),
    name: text('name'),
    date: text('date'),
    user_id: integer('user_id')
        .references(() => usersTable.id)
})