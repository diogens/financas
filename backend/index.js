const { prisma } = require("./generated/prisma-client");

async function main() {
  await prisma.createUser({
    name: "Diogenes Oliveira",
    email: "diogensgreen@gmail.com",
    password: "123"
  });

  const users = await prisma.users();

  console.log(users);
}

main().catch(e => console.error(e));
