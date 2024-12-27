import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  bookId!: string;
  book: any = {id:'', title: '', author: '', publishedDate: '' ,Isbn:''};
  errorMessage: string | undefined;
  today:string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {
    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    
    // Fetch book details from backend using the book ID
    this.apiService.getBookById(this.bookId).subscribe(
      (response: any) => {
        this.book = response;
      },
      (error: any) => {
        this.errorMessage = 'Failed to fetch book details.';
        console.error(error);
      }
    );
  }

  onSubmit(form: any) {
    if (form.valid) {
      // Call the backend service to update the book
      this.apiService.updateBook(this.bookId, form.value).subscribe(
        () => {
          this.router.navigate(['/']);  // Navigate back to Book List page
        },
        (error: any) => {
          console.error('Error updating book:', error);
        }
      );
    }
  }
}
