import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
  await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      image: `https://picsum.photos/seed/${Math.random()}/200`,
      posts: {
        create: {
          description: 'Check out Prisma with Next.js',
          image: 'https://picsum.photos/200',
        },
      },
    },
  })

  await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      image: `https://picsum.photos/seed/${Math.random()}/200`,
      posts: {
        create: [
          {
            description: 'Follow Prisma on Twitter',
            image: 'https://picsum.photos/200',
          },
          {
            description: 'Follow Nexus on Twitter',
            image: 'https://picsum.photos/200',
          },
        ],
      },
    },
  })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
