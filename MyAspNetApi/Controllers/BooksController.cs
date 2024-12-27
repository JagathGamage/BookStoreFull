using Microsoft.AspNetCore.Mvc;
using MyAspNetApi.Models;
using System.Collections.Generic;

namespace MyAspNetApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        // In-memory book list
        private static readonly List<Book> Books = new List<Book>
        {
            new Book { Id = 0, Title = "The Great Gatsby", Author = "F. Scott Fitzgerald", PublishedDate = "1925-01-01",Isbn="12345" },
            new Book { Id = 1, Title = "To Kill a Mockingbird", Author = "Harper Lee", PublishedDate = "1960-11-12",Isbn="12346" },
            new Book { Id = 2, Title = "1984", Author = "George Orwell", PublishedDate = "1949-10-14",Isbn="12347" },
            new Book { Id = 3, Title = "Moby Dick", Author = "Herman Melville", PublishedDate = "1851-09-24",Isbn="12348" },
            new Book { Id = 4, Title = "Pride and Prejudice", Author = "Jane Austen", PublishedDate = "1813-09-23",Isbn="12349" },
            new Book { Id = 5, Title = "The Hobbit", Author = "J.R.R. Tolkien", PublishedDate = "1937-11-23",Isbn="12341" },
            new Book { Id = 6, Title = "The Catcher in the Rye", Author = "J.D. Salinger", PublishedDate = "1951-10-09" ,Isbn="12342"},
            new Book { Id = 7, Title = "Brave New World", Author = "Aldous Huxley", PublishedDate = "1932-11-11",Isbn="12343" },
          
        };

        // GET api/books?page=1&size=5
        [HttpGet]
        public IActionResult GetBooks(int page = 1, int size = 5)
        {
            var paginatedBooks = Books.Skip((page - 1) * size).Take(size).ToList();
            var totalBooks = Books.Count();
            var totalPages = (int)Math.Ceiling((double)totalBooks / size);

            return Ok(new
            {
                Books = paginatedBooks,
                TotalBooks = totalBooks,
                TotalPages = totalPages,
                CurrentPage = page
            });
        }


        // POST api/books
        [HttpPost]
        public IActionResult AddBook([FromBody] Book book)
        {
            if (book == null)
            {
                return BadRequest("Invalid book data.");
            }
            book.Id= Books.Count;

            Books.Add(book); // Add the book to the in-memory list
            return CreatedAtAction(nameof(GetBooks), new { title = book.Title }, book); // Return the added book
        }

        [HttpGet("{id}")]
        public IActionResult GetBookById(int id)
        {
            var book = Books.FirstOrDefault(b => b.Id == id); 
            if (book == null)
            {
                return NotFound();
            }
            return Ok(book);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateBook(int id, [FromBody] Book updatedBook)
        {
            var book = Books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            book.Title = updatedBook.Title;
            book.Author = updatedBook.Author;
            book.PublishedDate = updatedBook.PublishedDate;
            book.Isbn=updatedBook.Isbn;

            return Ok(book);  // Return the updated book
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteBook(int id)
        {
            var book = Books.FirstOrDefault(b => b.Id == id);
            if (book == null)
            {
                return NotFound();
            }

            Books.Remove(book);
            return NoContent(); // Return 204 status code indicating successful deletion
        }

    }
}
