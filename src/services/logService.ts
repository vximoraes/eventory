import sqlite3 from "sqlite3"
import { formatDateTime, formatEventDate } from "../utils/dateUtils"
import { User } from "../models/userModel"

const db = new sqlite3.Database('./data/database.db')

export function createLogsTableDb(): Promise<boolean> {
    const query = `
        CREATE TABLE IF NOT EXISTS logs (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            action     TEXT,
            entity     TEXT,
            user_id    INTEGER,
            user_name  TEXT,
            timestamp  TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    `

    return new Promise((resolve, reject) => {
        db.run(query, (error) => {
            if (error) {
                reject(error)
            } else {
                resolve(true)
            }
        })
    })
}

export function createLogDb(action: string, entity: string, user_id: number): Promise<boolean> {
    const query = `
        INSERT INTO logs (action, entity, user_id, user_name, timestamp)
        VALUES (?, ?, ?, ?, ?)
    `

    return new Promise((resolve, reject) => {
        const timestamp = formatDateTime(new Date())

        const userQuery = `SELECT name FROM users WHERE id = ?`

        db.get(userQuery, [user_id], (error, row: User) => {
            if (error) {
                reject(error)
            } else if (row) {
                const user_name = row.name
                db.run(query, [action, entity, user_id, user_name, timestamp], function (error) {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(true)
                    }
                })
            } else {
                reject("User not found")
            }
        })
    })
}