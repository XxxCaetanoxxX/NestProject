import * as bcrypt from 'bcrypt'
import { PrismaClient, Profile } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const caetano = await prisma.user.create({
        data: {
            name: 'caetano',
            password: await bcrypt.hash('1234', 10),
            profile: Profile.ADMIN
        }
    })
    console.log(caetano)
}

main()