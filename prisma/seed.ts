import * as bcrypt from 'bcrypt'
import { PrismaClient, Profile } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {

    const caetano = await prisma.user.create({
        data: {
            name: 'caetano',
            password: await bcrypt.hash('dpmg123', 10),
            profile: Profile.ADMIN,
            creationDate: new Date(),
            updateDate: new Date(),
            version: 1
        }
    })
    console.log(caetano)
}

main()