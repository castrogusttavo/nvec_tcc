import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-item-comunnity',
  templateUrl: './update-item-comunnity.page.html',
  styleUrls: ['./update-item-comunnity.page.scss'],
})
export class UpdateItemComunnityPage implements OnInit {

  userId!: string;
  communityId!: string;
  listId!: string;
  end_lista!: string;

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
    });
  }

  async updateItem() {
    try {
      const response: any = await this.http.patch(
        `http://localhost:3001/api/varItemLocal/${this.userId}/${this.communityId}/${this.listId}`,
        { end_lista: this.end_lista }
      ).toPromise();

      console.log('Local do item atualizado com sucesso:', response);
      this.router.navigate(['/comunnity-lists-item', this.userId, this.communityId, this.listId]);
    } catch (err) {
      console.error('Erro ao atualizar local do item:', err);
    }
  }
}
