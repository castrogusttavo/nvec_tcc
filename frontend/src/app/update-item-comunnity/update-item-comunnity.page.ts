import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-item-comunnity',
  templateUrl: './update-item-comunnity.page.html',
  styleUrls: ['./update-item-comunnity.page.scss'],
})
export class UpdateItemComunnityPage implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router,private formBuilder: FormBuilder) {}

  userId!:string;
  communityId!:string;
  listId!:string;
  itemId!:string;

  end_lista!:string

  item:any={};

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.communityId = params['communityId'];
      this.listId = params['listId'];
    });
  }
  async updateItem(event: { preventDefault: () => void; }) {
    event.preventDefault();
  
    try {
      const response: any = await this.http.patch(
        `http://localhost:3001/api/varItemLocal/${this.userId}/${this.communityId}/${this.listId}`,
        { end_lista: this.end_lista }
      ).toPromise();
  
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao atualizar item: ', err);
    }
  }

}
