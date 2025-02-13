import { createUser } from "../controllers/userController";
import { User } from "../models/userModel";
import { faker } from '@faker-js/faker';

export async function createUserSeed() {   
    for(let i = 0; i <= 10; i++) {
        const user: User = {
            name: faker.internet.username(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 20, memorable: true, pattern: /[A-Za-z0-9!@#$%^&*(),.?":{}|<>]/ })
        }

        await createUser(user.name, user.email, user.password)
    }
}