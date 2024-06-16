import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-item-user',
  templateUrl: './update-item-user.page.html',
  styleUrls: ['./update-item-user.page.scss'],
})
export class UpdateItemUserPage implements OnInit {

  userId!: string;
  communityId!: string;
  listId!: string;
  itemId!: string;
  vl_uni!: number;
  item: any = {};

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.communityId = params['communityId'];
      this.listId = params['listId'];
      this.itemId = params['itemId'];
    });

    this.getItem();
  }

  async getItem() {
    try {
      const response: any = await this.http.get(
        `http://localhost:3001/api/varItem/${this.communityId}/${this.listId}/${this.itemId}`
      ).toPromise();

      this.item = response;
      console.log('Item carregado:', this.item);
    } catch (err) {
      console.error('Erro ao carregar item:', err);
    }
  }

  async updateItem(event: { preventDefault: () => void; }) {
    event.preventDefault();

    try {
      const response: any = await this.http.patch(
        `http://localhost:3001/api/varItem/${this.userId}/${this.communityId}/${this.listId}/${this.itemId}`,
        { vl_uni: this.vl_uni }
      ).toPromise();

      console.log('Item atualizado com sucesso:', response);
      this.router.navigate(['/comunnity-lists-item', this.userId, this.communityId, this.listId]);
    } catch (err) {
      console.error('Erro ao atualizar item:', err);
    }
  }
}
