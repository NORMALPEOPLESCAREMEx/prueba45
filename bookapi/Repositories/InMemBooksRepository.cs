using bookapi.Models;

namespace bookapi.Repositories
{
  public class InMemBooksRepository : IBooksRepository
  {
    private readonly List<Book> _books = new()
    {
        new Book { Id = 1, Title = "The Lord of the Rings", Author = "J.R.R. Tolkien" },
        new Book { Id = 2, Title = "The Hobbit", Author = "J.R.R. Tolkien" },
        new Book { Id = 3, Title = "The Catcher in the Rye", Author = "J.D. Salinger" },
        new Book { Id = 4, Title = "The Grapes of Wrath", Author = "John Steinbeck" },
        new Book { Id = 5, Title = "To Kill a Mockingbird", Author = "Harper Lee" },
        new Book { Id = 6, Title = "1984", Author = "George Orwell" },
        new Book { Id = 7, Title = "Brave New World", Author = "Aldous Huxley" }
    };

    public IEnumerable<Book> GetBooks() => _books;
    public Book GetBook(int id) => _books.Where(b => b.Id == id).SingleOrDefault();
  }
}