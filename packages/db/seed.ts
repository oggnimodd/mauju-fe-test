// This script is only used in development to seed the database
import { searchBooks } from "@acme/google-books";
import { prisma } from "./index";

const USER_ID = process.env.SEED_USER_ID;
const NUMBER_OF_BOOKS_PER_SHELF = 10;
const QUERY = "Harry Potter";

if (!USER_ID) {
  throw new Error("Please add USER_ID to .env file before running seed script");
}

// Get all shelf
const shelf = await prisma.shelf.findMany({
  where: {
    userId: USER_ID,
  },
});

// Delete all books
await prisma.book.deleteMany({
  where: {
    userId: USER_ID,
  },
});

// Search random books
const books = await searchBooks({
  query: QUERY,
  startIndex: 0,
  maxResults: NUMBER_OF_BOOKS_PER_SHELF * shelf.length,
});

if (books.items?.length) {
  for (let i = 0; i < books.items?.length; i++) {
    await prisma.book.create({
      data: {
        title: books.items[i].volumeInfo.title,
        description: books.items[i].volumeInfo.description,
        author: books.items[i].volumeInfo.authors?.join(","),
        cover: books.items[i].volumeInfo.imageLinks?.thumbnail,
        googleBooksUrl: books.items[i].volumeInfo.infoLink,
        userId: USER_ID,
        shelfId: shelf[i % shelf.length].id,
      },
    });
  }
}
