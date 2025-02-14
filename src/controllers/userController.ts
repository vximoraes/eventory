import { v4 as uuid } from 'uuid'
import { User } from './../models/userModel'
import { validateUser } from '../validations/userValidation'
import { createUserDb, createUserTableDb, deleteUserDb, listAllUsersDb, listUserDb, updateUserDb } from '../services/userService'
import { getCurrentTime } from '../utils/loggerUtils'
import { hashPassword } from '../utils/passwordUtils'
import { createUserLog } from '../logs/userLog'

export async function createUserTable() {
    try {
        const createdTable = await createUserTableDb()

        if (createdTable) {
            console.log(`${getCurrentTime()} - Tabela users criada com sucesso!`)
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao criar a tabela users: ${error}`)
    }
}

export async function createUser(name: string, email: string, password: string) {
    const hashedPassword = await hashPassword(password)
    
    const user: User = {
        name,
        email,
        password: hashedPassword    
    }

    const validation = validateUser(user)

    if (!validation.success) {
        console.log(`${getCurrentTime()} - Erros de validação ao inserir usuário:`)
        validation.error.errors.forEach((err) => {
            console.log(`${getCurrentTime()} - - ${err.path.join(".")}: ${err.message}`)
        })
        return
    }

    try {
        const createdUser = await createUserDb(user)

        if (createdUser) {
            console.log(`${getCurrentTime()} - Usuário inserido com sucesso!`)
            await createUserLog(uuid(), createdUser, new Date(), 'INSERT USER')
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao inserir usuário: ${error}}`)
    }
}

export async function listAllUsers() {
    try {
        const listedUsers = await listAllUsersDb()

        if (listedUsers && listedUsers.length > 0) {
            console.log(`${getCurrentTime()} - Usuários cadastrados:`)
            console.log(listedUsers)
        } else {
            console.log(`${getCurrentTime()} - Nenhum usuário encontrado.`)
        }
    } catch (error) {
        console.error(`${getCurrentTime()} - Erro ao listar usuários: ${error}`)
    }
}

export async function listUser(id: number) {
    try {
        const listedUser = await listUserDb(id)

        if (listedUser) {
            console.log(`${getCurrentTime()} - Usuário com id '${id}':`)
            console.log(listedUser)
            return listedUser
        } else {
            console.log(`${getCurrentTime()} - Nenhum usuário encontrado através do id '${id}'.`)
            return false
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao listar usuário: ${error}`)
    }
}

export async function updateUser(id: number, name: string, email: string, password: string) {
    const hashedPassword = await hashPassword(password)
    
    const updateUser: User = {
        id,
        name,
        email,
        password: hashedPassword
    }

    const validation = validateUser(updateUser)

    if (!validation.success) {
        console.log(`${getCurrentTime()} - Erros de validação ao atualizar usuário:`)
        validation.error.errors.forEach((err) => {
            console.log(`${getCurrentTime()} - - ${err.path.join(".")}: ${err.message}`)
        })
        return
    }

    try {
        const updatedUser = await updateUserDb(updateUser)

        if (updatedUser) {
            console.log(`${getCurrentTime()} - Usuário '${updateUser.id}' alterado com sucesso!`)
            await createUserLog(uuid(), id, new Date(), 'UPDATE USER')
        } else {
            console.log(`${getCurrentTime()} - Nenhum usuário encontrado através do id '${updateUser.id}.'`)
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao alterar usuário: ${error}`)
    }
}

export async function deleteUser(id: number) {
    try {
        const deletedUser = await deleteUserDb(id)

        if (deletedUser) {
            console.log(`${getCurrentTime()} - Usuário com id '${id}' deletado com sucesso!`)
            await createUserLog(uuid(), id, new Date(), 'DELETE USER')
        } else {
            console.log(`${getCurrentTime()} - Nenhum usuário encontrado através do id '${id}.'`)
        }
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao deletar usuário: ${error}`)
    }
}
