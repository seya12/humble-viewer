const books = [
  {
    id: 1,
    name: "The Art of Doing Science and Engineering",
    url: "https://www.humblebundle.com/books/the-art-of-doing-science-and-engineering-mit-press-books",
    price: 1,
    tier: "1",
  },
  {
    id: 2,
    name: "Bla",
    url: "nice",
    price: 5,
    tier: "1",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p>input</p>
      {books.map((book) => (
        <div
          key={book.id}
          className="flex flex-col items-center justify-between m-10">
          <p>{book.name}</p>
          <p>{book.url}</p>
          <p>{book.price}</p>
          <p>{book.tier}</p>
        </div>
      ))}
    </main>
  );
}
