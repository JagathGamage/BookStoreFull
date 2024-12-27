import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgIf,CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  imports: [NgIf,CommonModule]
})
export class BookListComponent implements OnInit {
  books: any[] = []; // Array to hold the book list
  errorMessage: string | null = null; // To display errors if any
  currentPage: number = 1;
  totalBooks: number = 0;
  totalPages: number = 0;
  pageSize: number = 4;
  // dialog: any;

  constructor(private apiService: ApiService,private router: Router,private dialog: MatDialog) {}

  ngOnInit() {
    // Fetch the book list from the backend
    this.loadBooks();
  }
  loadBooks() {
    this.apiService.getData(`books?page=${this.currentPage}&size=${this.pageSize}`).subscribe(
      (response: any) => {
        this.books = response.books;
        this.totalBooks = response.totalBooks;
        this.totalPages = response.totalPages;
        console.log(this.books);
      },
      (error: any) => {
        console.error(error);
        this.errorMessage = 'Failed to load books.';
      }
    );
  }

  navigateToAddBook() {
    this.router.navigate(['/book-add']);  // Navigates to the Add Book page
  }
  navigateToEditBook(book: any) {
    this.router.navigate(['/edit-book', book.id]);  // Pass book ID to the Edit Book page
  }
  deleteBook(bookId: string) {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // User confirmed deletion
        this.apiService.deleteBook(bookId).subscribe(
          () => {
            this.books = this.books.filter((book) => book.id !== bookId);
            // this.loadBooks();
          },
          (error: any) => {
            console.error(error);
            this.errorMessage = 'Failed to delete book.';
          }
        );
      }
    });
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.loadBooks();
  }
}
