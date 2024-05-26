import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lists-itens-screen',
  templateUrl: './lists-itens-screen.page.html',
  styleUrls: ['./lists-itens-screen.page.scss'],
})
export class ListsItensScreenPage implements OnInit {
  listId: string | null = null;
  items: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.listId = this.route.snapshot.paramMap.get('id');
    console.log('List ID:', this.listId);

    if (this.listId) {
      this.getItems(this.listId).subscribe(items => {
        this.items = items;
      });
    }
  }

  getItems(listId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3001/api/lists/${listId}`);
  }

}
