import { createLogsTable } from "./controllers/logController"
import { createUserTable } from "./controllers/userController"
import { createEventTable } from "./controllers/eventController"
import { main } from './cli/cli';  

// ------------- Logs ------------

// Criar a tabela de logs
createLogsTable()

// ------------ Users ------------

// Criar a tabela de usuários
createUserTable()

// ----------- Eventos -----------

// Criar a tabela de eventos
createEventTable()

// ------------ CLI --------------

// Chama a função principal da CLI  
main()