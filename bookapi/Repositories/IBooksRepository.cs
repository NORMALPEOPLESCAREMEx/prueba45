using bookapi.Models;

namespace bookapi.Repositories
{
  public interface IBooksRepository
  {
    Book GetBook(int id);
    IEnumerable<Book> GetBooks();
  }
}