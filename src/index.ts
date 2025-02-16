import { createUserTable } from "./controllers/userController"
import { createEventTable } from "./controllers/eventController"
import { main } from './cli/cli'

// ------------ Users ------------

createUserTable()

// ----------- Events -----------

createEventTable()

// ------------ CLI --------------

main()