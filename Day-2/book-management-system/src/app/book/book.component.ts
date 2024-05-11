import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  title: string = "";
  author: string = "";


  books:Book [] = [];
  ngOnInit(): void {
    let storedbooks = localStorage.getItem("books");
    this.books = storedbooks ? JSON.parse(storedbooks) : [];
  }

  addBook() {
    if (this.title.trim().length && this.author.trim().length) {
      let newApp: Book = {
        id: Date.now(),
        title: this.title,
        author: this.author,
      }
      this.books.push(newApp);
      this.title = "";
      this.author = "";

      localStorage.setItem("books", JSON.stringify(this.books))
    }
  }
  deleteBook(idx: number) {
    this.books.splice(idx, 1);
    localStorage.setItem("books", JSON.stringify(this.books))
  }
}
