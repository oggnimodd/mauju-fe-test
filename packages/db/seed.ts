// This script is only used in development to seed the database
import { prisma } from "./index";
import type { STATUS } from "../api/models";
import { v4 as uuidv4 } from "uuid";
import { Item } from "./index";

const TRANSACTION_STATUS: STATUS[] = ["PENDING", "SUCCESS", "FAILED"];

const USER_ID = process.env.SEED_USER_ID;

if (!USER_ID) {
  throw new Error("Please add USER_ID to .env file before running seed script");
}

// Define the number of transactions to seed
const NUMBER_OF_TRANSACTIONS = 100;

// Clear existing transactions
await prisma.transaction.deleteMany();

type BASED_ITEM = Omit<Item, "transactionId" | "createdAt" | "updatedAt">;

const generateItems = (numItems: number) => {
  const items: BASED_ITEM[] = [];

  for (let i = 0; i < numItems; i++) {
    const item: BASED_ITEM = {
      name: `Item ${i + 1}`,
      description: `Description for Item ${i + 1}`,
      quantity: Math.floor(Math.random() * 10) + 1,
      price: Math.round(Math.random() * 100),
      userId: USER_ID,

      id: uuidv4(),
    };

    items.push(item);
  }

  return items;
};

for (let i = 0; i < NUMBER_OF_TRANSACTIONS; i++) {
  const randomStatus =
    TRANSACTION_STATUS[Math.floor(Math.random() * TRANSACTION_STATUS.length)];
  const items = generateItems(Math.floor(Math.random() * 5) + 1); // Generate between 1 and 5 items
  const totalPrice = items.reduce(
    (total, item) => total + item.quantity * item.price,
    0,
  );

  await prisma.transaction.create({
    data: {
      id: uuidv4(),
      userId: USER_ID, // replace with actual user id
      total: totalPrice,
      status: randomStatus,
      items: {
        create: items,
      },
    },
  });
}
