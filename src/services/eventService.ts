import { Event } from './../models/eventModel'
import { formatDate } from "../utils/dateUtils"
import { eq } from 'drizzle-orm'
import { eventsTable } from '../db/schema'
import { db } from '../db'

export async function createEventDb(event: Event): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const formattedEvent = { ...event, date: formatDate(event.date) }
        db.insert(eventsTable).values(formattedEvent)
            .then(() => {
                resolve(true)
            }).catch((error) => {
                reject(error)
            })
    })
}

export async function listAllEventsDb(): Promise<any[]> {
    return new Promise((resolve, reject) => {
        db.select().from(eventsTable)
            .then((users) => {
                resolve(users)
            }).catch((error) => {
                reject(error)
            })
    })
}

export async function listEventDb(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        db.select().from(eventsTable).where(eq(eventsTable.id, id))
            .then((user) => {
                resolve(user)
            }).catch((error) => {
                reject(error)
            })
    })
}

export async function updateEventDb(event: Event): Promise<any> {  
    return new Promise((resolve, reject) => {  
        if (event.id === undefined) {  
            return reject(new Error("User ID is required"))  
        }  

        const formattedEvent = { ...event, date: formatDate(event.date) }

        db.update(eventsTable)  
            .set(formattedEvent)  
            .where(eq(eventsTable.id, event.id))  
            .then(result => {  
                resolve(result) 
            })  
            .catch(error => {  
                reject(error) 
            })  
    })  
} 

export async function deleteEventDb(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        db.delete(eventsTable).where(eq(eventsTable.id, id))
        .then(() => {
            resolve(true)
        }).catch((error) => {
            reject(error)
        })
    })
}