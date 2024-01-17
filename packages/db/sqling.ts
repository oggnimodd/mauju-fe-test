import { prisma } from ".";

for (let i = 0; i < 100; i++) {
  await prisma.post.create({
    data: {
      id: crypto.randomUUID(),
      title: "Test",
      content: "content",
    },
  });
}
