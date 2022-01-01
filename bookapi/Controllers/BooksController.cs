using bookapi.Data;
using bookapi.Dtos;
using bookapi.Models;
using bookapi.Repositories;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace bookapi.Controllers
{


    [ApiController]
    [Route("api/books")]
    [EnableCors("AllowAll")]
    public class BooksController : ControllerBase
    {
        private readonly DataContext _context;

        public BooksController(DataContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<BookDto>>> GetBooks()
        {
            return Ok(await _context.Books.Select(book => book.asDto()).ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookDto>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            
            if (book is null)
            {
                return NotFound();
            }

            return Ok(book.asDto());
        }

        [HttpPost]
        public async Task<ActionResult<BookDto>> AddBook(Book book)
        {
            await _context.Books.AddAsync(book);
            await _context.SaveChangesAsync();

            return Created(nameof(GetBook), book);
        }

        [HttpPut]
        public async Task<ActionResult<BookDto>> UpdateBook(BookDto request)
        {
            var book = await _context.Books.FindAsync(request.Id);

            if (book is null)
            {
                return NotFound();
            }

            book.Title = request.Title;
            book.Author = request.Author;

            await _context.SaveChangesAsync();

            return Ok(await _context.Books.FindAsync(request.Id));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BookDto>> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}