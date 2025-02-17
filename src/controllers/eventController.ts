import { v4 as uuid } from 'uuid'
import { Event } from './../models/eventModel'
import { getCurrentTime } from '../utils/loggerUtils'
import { createEventDb, createEventTableDb, deleteEventDb, listAllEventsDb, listEventDb, updateEventDb } from '../services/eventService'
import { validateEvent } from '../validations/eventValidation'
import { createEventLog } from '../logs/eventLog'

export async function createEventTable() {
    try {
        const createdTable = await createEventTableDb()

        if (createdTable) {
            // console.log(`${getCurrentTime()} - Tabela events criada com sucesso!`)
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao criar a tabela events: ${error}`)
    }
}

export async function createEvent(name: string, date: Date, user_id: number) {
    const validation = validateEvent({ name, date, user_id })

    if (!validation.success) {
        console.log(`${getCurrentTime()} - Erros de validação ao inserir evento:`)
        validation.error.errors.forEach((err) => {
            console.log(`${getCurrentTime()} - - ${err.path.join(".")}: ${err.message}`)
        })

        return
    }

    const event: Event = {
        name,
        date: new Date(date.toISOString()),
        user_id
    }

    try {
        const createdEvent = await createEventDb(event)

        if (createdEvent) {
            console.log(`${getCurrentTime()} - Evento inserido com sucesso!`)
            await createEventLog(uuid(), date, 'INSERT EVENT')
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao inserir evento: ${error}}`)
    }
}

export async function listAllEvents() {
    try {
        const listedEvents = await listAllEventsDb()

        if (listedEvents && listedEvents.length > 0) {
            console.log(`${getCurrentTime()} - Eventos cadastrados:`)
            console.log(listedEvents)
        } else {
            console.log(`${getCurrentTime()} - Nenhum evento encontrado.`)
        }
    } catch (error) {
        console.error(`${getCurrentTime()} - Erro ao listar eventos: ${error}`)
    }
}

export async function listEvent(id: number) {
    try {
        const listedEvent = await listEventDb(id)

        if (listedEvent) {
            console.log(`${getCurrentTime()} - Evento com id '${id}':`)
            console.log(listedEvent)
            return listedEvent
        } else {
            console.log(`${getCurrentTime()} - Nenhum evento encontrado através do id '${id}'.`)
            return false
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao listar evento: ${error}`)
    }
}

export async function updateEvent(id: number, name: string, date: Date, user_id: number) {
    const validation = validateEvent({ name, date, user_id })

    if (!validation.success) {
        console.log(`${getCurrentTime()} - Erros de validação ao atualizar evento:`)
        validation.error.errors.forEach((err) => {
            console.log(`${getCurrentTime()} - - ${err.path.join(".")}: ${err.message}`)
        })

        return
    }

    const updateEvent: Event = {
        id,
        name,
        date: new Date(date.toISOString()),
        user_id
    }

    try {
        const updatedEvent = await updateEventDb(updateEvent)

        if (updatedEvent) {
            console.log(`${getCurrentTime()} - Evento '${updateEvent.id}' alterado com sucesso!`)
            await createEventLog(uuid(), date, 'UPDATE EVENT')
        } else {
            console.log(`${getCurrentTime()} - Nenhum evento encontrado através do id '${updateEvent.id}.'`)
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao alterar evento: ${error}`)
    }
}

export async function deleteEvent(id: number) {
    try {
        const deletedEvent = await deleteEventDb(id)

        if (deletedEvent) {
            console.log(`${getCurrentTime()} - Evento com id '${id}' deletado com sucesso!`)
            await createEventLog(uuid(), new Date(), 'DELETE EVENT')
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro de log ao deletar evento, usuário não existente: ${error}`)
    }
}