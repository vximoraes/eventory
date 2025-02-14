import fs from 'fs'
import { getCurrentTime } from '../utils/loggerUtils'

export const filePath: string = './data/user.log'  

export async function createUserLog(id: string, user_id: number, date: Date, action: string) {
    try {
        const eventString = `${getCurrentTime()} - ID: ${id}, User ID: ${user_id}, Date: ${date.toISOString()}, Action: ${action}\n`

        await fs.appendFileSync(filePath, eventString, 'utf-8')
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao escrever no arquivo de log: ${(error as Error).message}`) 
    }
}