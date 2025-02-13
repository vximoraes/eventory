import inquirer from 'inquirer'
import * as eventController from '../controllers/eventController'
import * as userController from '../controllers/userController'
import { getCurrentTime } from '../utils/loggerUtils'

async function mainMenu() {
    const { option } = await inquirer.prompt([
        {
            type: 'list',
            name: 'option',
            message: 'Bem-vindo! Selecione uma das opções:',
            choices: [
                { name: '1 - Gerenciar Eventos' , value: 'events' },
                { name: '2 - Gerenciar Usuários', value: 'users'  },
                { name: '3 - Sair'              , value: 'exit'   }
            ]
        }
    ])

    if (option === 'events') {
        await eventMenu()
    } else if (option === 'users') {
        await userMenu()
    } else {
        console.log(`${getCurrentTime()} -  Até logo!`)
        process.exit(0)
    }

    await mainMenu()
}

async function eventMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Selecione uma das opções:',
            choices: [
                { name: '1 - Criar um evento'         , value: 'create'  },
                { name: '2 - Listar todos os eventos' , value: 'listAll' },
                { name: '3 - Listar um evento por ID' , value: 'listOne' },
                { name: '4 - Atualizar um evento'     , value: 'update'  },
                { name: '5 - Deletar um evento'       , value: 'delete'  },
                { name: '6 - Voltar ao menu principal', value: 'back'    }
            ]
        }
    ])

    switch (action) {
        case 'create':
            const { name, date, user_id } = await inquirer.prompt([
                { type: 'input' , name: 'name'   , message: 'Nome do evento:'              },
                { type: 'input' , name: 'date'   , message: 'Data do evento (AAAA-MM-DD):' },
                { type: 'number', name: 'user_id', message: 'ID do usuário:'               }
            ])
            await eventController.createEvent(name, new Date(date), user_id)
            break
        case 'listAll':
            await eventController.listAllEvents()
            break
        case 'listOne':
            const { eventId } = await inquirer.prompt([
                { type: 'number', name: 'eventId', message: 'ID do evento:' }
            ])
            await eventController.listEvent(eventId)
            break
        case 'update':
            const updateData = await inquirer.prompt([
                { type: 'number', name: 'id'     , message: 'ID do evento a ser atualizado:'    },
                { type: 'input' , name: 'name'   , message: 'Novo nome do evento:'              },
                { type: 'input' , name: 'date'   , message: 'Nova data do evento (YYYY-MM-DD):' },
                { type: 'number', name: 'user_id', message: 'Novo ID do usuário:'               }
            ])
            await eventController.updateEvent(updateData.id, updateData.name, new Date(updateData.date), updateData.user_id)
            break
        case 'delete':
            const { deleteId } = await inquirer.prompt([
                { type: 'number', name: 'deleteId', message: 'ID do evento a ser deletado:' }
            ])
        
            const { confirmDelete } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirmDelete',
                    message: `Você tem certeza que deseja deletar o evento de ID ${deleteId}?`,
                    default: false 
                }
            ])
        
            if (confirmDelete) {
                await eventController.deleteEvent(deleteId)
            } else {
                console.log(`${getCurrentTime()} - Operação de exclusão cancelada!`)
            }
            break
        case 'back':
            return  
    }

    await eventMenu() 
}

async function userMenu() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que você gostaria de fazer com os usuários?',
            choices: [
                { name: '1 - Criar um usuário'        , value: 'create'  },
                { name: '2 - Listar todos os usuários', value: 'listAll' },
                { name: '3 - Listar um usuário por ID', value: 'listOne' },
                { name: '4 - Atualizar um usuário'    , value: 'update'  },
                { name: '5 - Deletar um usuário'      , value: 'delete'  },
                { name: '6 - Voltar ao menu principal', value: 'back'    }
            ]
        }
    ])

    switch (action) {
        case 'create':
            const { name, email, password } = await inquirer.prompt([
                { type: 'input'   , name: 'name'    , message: 'Nome:'                                                                },
                { type: 'input'   , name: 'email'   , message: 'Email do usuário:'                                                    },
                { type: 'password', name: 'password', message: 'Senha do usuário(deve conter 8 dígitos, número e caracter especial):' }
            ])
            await userController.createUser(name, email, password)
            break
        case 'listAll':
            await userController.listAllUsers()
            break
        case 'listOne':
            const { userId } = await inquirer.prompt([
                { type: 'number', name: 'userId', message: 'ID do usuário:' }
            ])
            await userController.listUser(userId)
            break
        case 'update':
            const updateData = await inquirer.prompt([
                { type: 'number'  , name: 'id'      , message: 'ID do usuário a ser atualizado:' },
                { type: 'input'   , name: 'name'    , message: 'Novo nome do usuário:'           },
                { type: 'input'   , name: 'email'   , message: 'Novo email do usuário:'          },
                { type: 'password', name: 'password', message: 'Nova senha do usuário:'          }
            ])
            await userController.updateUser(updateData.id, updateData.name, updateData.email, updateData.password)
            break
        case 'delete':
            const { deleteId } = await inquirer.prompt([
                { type: 'number', name: 'deleteId', message: 'ID do usuário a ser deletado:' }
            ])
        
            const { confirmDelete } = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirmDelete',
                    message: `Você tem certeza que deseja deletar o usuário de ID ${deleteId}?`,
                    default: false 
                }
            ])
        
            if (confirmDelete) {
                await userController.deleteUser(deleteId)
            } else {
                console.log(`${getCurrentTime()} - Operação de exclusão cancelada!`)
            }
            break            
        case 'back':
            return 
    }

    await userMenu() 
}

export async function main() {
    await mainMenu() 
}