import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-add',
  imports: [CommonModule,FormsModule],
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.css']
})
export class BookAddComponent {
  book = { title: '', author: '', publishedDate: '',isbn:'' };
  errorMessage: string | null = null;
  today: string;

  constructor(private apiService: ApiService, private router: Router) {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
  }

  addBook() {
    this.apiService.addBook(this.book).subscribe(
      (response) => {
        this.router.navigate(['/']);  // Navigate to the book list after adding the book
      },
      (error) => {
        this.errorMessage = 'Failed to add the book. Please try again.';
      }
    );
  }
}
