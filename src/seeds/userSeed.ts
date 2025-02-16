import { faker } from '@faker-js/faker'
import { User } from "../models/userModel"
import { createUser } from "../controllers/userController"

export async function createUserSeed() {   
    for(let i = 0; i < 10; i++) {
        const user: User = {
            name: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password({
                length: 10, 
                memorable: false,
                pattern: /[A-Za-z0-9!@#$%^&*(),.?":{}|<>]/,
                prefix: 'A1@' 
            })
        }

        await createUser(user.name, user.email, user.password)
    }
}