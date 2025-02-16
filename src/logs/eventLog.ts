import fs from 'fs'
import { getCurrentTime } from '../utils/loggerUtils'
import { formatDate } from '../utils/dateUtils'
import { currentUser } from '../cli/cli'

export const filePath: string = './data/evento.log'

export async function createEventLog(id: string, date: Date, action: string) {
    try {
        const username = currentUser 
        const eventString = `${getCurrentTime()} - ID: ${id}, Usuário: ${username}, Data: ${formatDate(date)}, Ação: ${action}\n`

        await fs.appendFileSync(filePath, eventString, 'utf-8')
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao escrever no arquivo de log: ${(error as Error).message}`)
    }
}