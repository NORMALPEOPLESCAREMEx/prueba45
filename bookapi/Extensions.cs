using bookapi.Dtos;
using bookapi.Models;

namespace bookapi
{
    public static class Extensions
    {
        public static BookDto asDto(this Book book)
        {
            return new BookDto
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author
            };
        }

        public static Book asModel(this BookDto book)
        {
            return new Book
            {
                Id = book.Id,
                Title = book.Title,
                Author = book.Author
            };
        }

        public static Book asModel(this AddBookDto book)
        {
            return new Book
            {
                Title = book.Title,
                Author = book.Author
            };
        }
    }
}