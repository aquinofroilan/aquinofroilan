import { getAllBooks } from "$lib/server/actions/books";

export const load = async () => {
    const books = await getAllBooks();
    return { books };
};
