import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const seedUsers = async () => {
  const arr = Array.from(Array(50).keys())
  arr.forEach(async (index) => {
    const user = faker.name.firstName() + ' ' + faker.name.lastName()
    const username = user.replace(' ', '_').toLowerCase()
    const password = await bcrypt.hash('password', 10)

    await prisma.user.create({
      data: {
        username,
        password,
        name: user,
        posts: {
          create: [{
            title: faker.lorem.sentence(6).replace('.', ''),
            description: faker.lorem.paragraphs(2)
          }, {
            title: faker.lorem.sentence(6).replace('.', ''),
            description: faker.lorem.paragraphs(3)
          }],
        },
      },
    })
    if (index === arr.length - 1) {
      await seedComments()
    }
  })
}

const seedComments = async () => {
  const posts = await prisma.post.findMany()

  await Promise.all(
    posts.map(async (post) =>{
      const userId = faker.datatype.number({ min: 1, max: 50 })

      try {
        await prisma.vote.create({
          data: {
            user: { connect: { id: userId }},
            post: { connect: { id: post.id }}
          },
          include: {
            user: true,
            post: true
          }
        });
      } catch ( error ) {
        console.log(error)
      }

      try {
        await prisma.comment.create({
          data: {
            message: faker.lorem.sentences(2),
            user: { connect: { id: userId }},
            post: { connect: { id: post.id }},
            votes: {
              create: {
                user: { connect: { id: userId }}
              }
            }
          }
        });
      } catch (error) {
        console.log(error)
      }
    })
  )
}

const main = async () => {
  await seedUsers()
  await prisma.$disconnect()
}

main()
