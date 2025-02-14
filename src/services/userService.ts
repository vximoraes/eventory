import sqlite3 from "sqlite3"
import { User } from './../models/userModel'

const db = new sqlite3.Database('./data/database.db')

export function createUserTableDb(): Promise<boolean> {
    const query = `
        CREATE TABLE IF NOT EXISTS users (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT,
            email      TEXT,
            password   TEXT
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

export function createUserDb(user: User): Promise<number> {
    const query = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
    `

    return new Promise((resolve, reject) => {
        db.run(query, [user.name, user.email, user.password], function (error) {
            if (error) {
                reject(error)
            } else {
                resolve(this.lastID)
            }
        })
    })
}

export function listAllUsersDb(): Promise<any[]> {
    const query = `
        SELECT * FROM users
    `

    return new Promise((resolve, reject) => {
        db.all(query, (error, rows) => {
            if (error) {
                reject(error)
            }
            resolve(rows)
        })
    })
}

export function listUserDb(id: number): Promise<any> {
    const query = `
        SELECT * FROM users WHERE id = ?
    `

    return new Promise((resolve, reject) => {
        db.get(query, [id], (error, row) => {
            if (error) {
                reject(error)
            } else if (row) {
                resolve(row)
            } else {
                resolve(null)
            }
        })
    })
}

export function updateUserDb(user: User): Promise<any> {
    const query = `
        UPDATE users 
        SET name = ?, email = ?, password = ?
        WHERE id = ?
    `

    return new Promise((resolve, reject) => {
        db.run(query, [user.name, user.email, user.password, user.id], function (error) {
            if (error) {
                reject(error)
            } else if (this.changes === 0) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}

export function deleteUserDb(id: number): Promise<any> {
    const query = `
        DELETE FROM users WHERE id = ?
    `

    return new Promise((resolve, reject) => {
        db.run(query, [id], function (error) {
            if (error) {
                reject(error)
            } else if (this.changes === 0) {
                resolve(false)
            } else {
                resolve(true)
            }
        })
    })
}