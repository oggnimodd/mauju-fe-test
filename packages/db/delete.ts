import { prisma } from ".";

const propertyNames = Object.getOwnPropertyNames(prisma);

const modelNames = propertyNames.filter(
  (propertyName) =>
    !propertyName.includes("_") &&
    !propertyName.includes("$") &&
    propertyName[0] !== propertyName[0].toUpperCase(),
);

for (let i = 0; i < modelNames.length; i++) {
  await prisma[modelNames[i]].deleteMany({});
}
