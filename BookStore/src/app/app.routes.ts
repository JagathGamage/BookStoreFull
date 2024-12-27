import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';


export const routes: Routes = [
    {
        path:'',
        component:BookListComponent
    },
    {
        path:'book-add',
        component:BookAddComponent
    },
    { path: 'edit-book/:id', component: BookEditComponent }, 
];
