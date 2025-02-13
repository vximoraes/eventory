import { createEvent } from "../controllers/eventController"
import { Event } from "../models/eventModel"
import { faker } from '@faker-js/faker'
import { listAllUsersDb } from "../services/userService"
import { getCurrentTime } from "../utils/loggerUtils"

export async function createEventSeed() {
    try {
        const users = await listAllUsersDb()

        if (users.length === 0) {
            console.log(`${getCurrentTime()} - Nenhum usuário encontrado. Impossível criar eventos.`)
            return
        }

        for (let i = 0; i < 10; i++) {
            const randomUserIndex = faker.number.int({ min: 0, max: users.length - 1 })
            const userId = users[randomUserIndex].id

            const event: Event = {
                name: faker.company.catchPhraseAdjective() + ' ' + faker.company.buzzNoun(),
                date: faker.date.future(),
                user_id: userId
            }

            await createEvent(event.name, event.date, event.user_id)
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao inserir evento: ${error}}`)
    }
}