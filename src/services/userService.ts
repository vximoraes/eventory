import { db } from '../db'
import { eq } from 'drizzle-orm'
import { User } from '../models/userModel'
import { usersTable } from '../db/schema'

export async function createUserDb(user: User): Promise<boolean> {
    return new Promise((resolve, reject) => {
        db.insert(usersTable).values(user)
            .then(() => {
                resolve(true)
            }).catch((error) => {
                reject(error)
            })
    })
}

export function listAllUsersDb(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.select().from(usersTable)
            .then((users) => {
                resolve(users)
            }).catch((error) => {
                reject(error)
            })
    })
}

export function listUserDb(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        db.select().from(usersTable).where(eq(usersTable.id, id))
            .then((user) => {
                resolve(user)
            }).catch((error) => {
                reject(error)
            })
    })
}

export function updateUserDb(user: User): Promise<any> {  
    return new Promise((resolve, reject) => {  
        if (user.id === undefined) {  
            return reject(new Error("User ID is required"))  
        }  

        db.update(usersTable)  
            .set(user)  
            .where(eq(usersTable.id, user.id))  
            .then(result => {  
                resolve(result) 
            })  
            .catch(error => {  
                reject(error) 
            })  
    })  
} 

export function deleteUserDb(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        db.delete(usersTable).where(eq(usersTable.id, id))
        .then(() => {
            resolve(true)
        }).catch((error) => {
            reject(error)
        })
    })
}