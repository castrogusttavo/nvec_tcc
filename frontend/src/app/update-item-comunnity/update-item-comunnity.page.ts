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
      console.log("userId ", this.userId);
      console.log("listId ", this.listId);
      console.log("communityId ", this.communityId);
    });
  }
  updateItem():void {
    try {
      console.log("ID DA LISTA: ", this.listId);
      const response: any =  this.http.patch(
        `http://localhost:3001/api/varItemLocal/${this.userId}/${this.communityId}/${this.listId}`,
        { end_lista: this.end_lista }
        
      ).toPromise();

      this.router.navigate(['/comunnity-lists-item', this.userId, this.communityId,this.listId]);
    } catch (err) {
      console.error('Erro ao atualizar item: ', err);
    }
  }
  
}
