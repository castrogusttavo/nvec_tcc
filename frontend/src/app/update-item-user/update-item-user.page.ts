import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-item-user',
  templateUrl: './update-item-user.page.html',
  styleUrls: ['./update-item-user.page.scss'],
})
export class UpdateItemUserPage implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,private formBuilder: FormBuilder) {}

  userId!:string;
  communityId!:string;
  listId!:string;
  itemId!:string;

  vl_uni!:number

  item:any={};

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.communityId = params['communityId'];
      this.itemId = params['itemId'];
      this.listId = params['listId'];
    });
    this.getItem();
  }

  getItem():void{
      
    try {
      const response: any = this.http.get(
        `http://localhost:3001/api/varItem/${this.communityId}/${this.listId}/${this.itemId}`
      ).toPromise();
  
      this.item = response;
      console.log("aaaaaaaa", this.item)
    } catch (err) {
      console.error('Erro ao enviar solicitação PATCH: ', err);
    }
  }

  async updateItem(event: { preventDefault: () => void; }) {
    event.preventDefault();
  
    try {
      const response: any = await this.http.patch(
        `http://localhost:3001/api/varItem/${this.userId}/${this.communityId}/${this.listId}/${this.itemId}`,
        { vl_uni: this.vl_uni }
      ).toPromise();
  
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao atualizar item: ', err);
    }
  }
  
}
