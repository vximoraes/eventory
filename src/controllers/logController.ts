import { createLogsTableDb } from "../services/logService";
import { getCurrentTime } from "../utils/loggerUtils";

export async function createLogsTable() {
    try {
        const createdTable = await createLogsTableDb();

        if (createdTable) {
            // console.log(`${getCurrentTime()} - Tabela logs criada com sucesso!`);
        }
    } catch (error) {
        console.error(`${getCurrentTime()} - Erro ao criar a tabela logs: ${error}`);
    }
}