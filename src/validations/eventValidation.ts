import { z } from "zod"
import { Event } from "../models/eventModel"

export const eventSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    date: z.date({ required_error: "A data é obrigatória" }),
    user_id: z.number().int().positive("O ID do usuário deve ser um número positivo")
})

export function validateEvent(event: Event) {
    return eventSchema.safeParse(event)
} 