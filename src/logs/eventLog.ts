import fs from 'fs'
import { v4 as uuid } from 'uuid'
import { getCurrentTime } from '../utils/loggerUtils'
import { formatDate } from '../utils/dateUtils'
import { currentUser } from '../cli/cli'

export const filePath: string = './data/evento.log'

export async function createEventLog(action: string) {
    try {
        const username = currentUser
        const eventString = `${getCurrentTime()} - ID: ${uuid()}, Usuário: ${username}, Data: ${formatDate(new Date())}, Ação: ${action}\n`

        await fs.appendFileSync(filePath, eventString, 'utf-8')
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao escrever no arquivo de log: ${(error as Error).message}`)
    }
}