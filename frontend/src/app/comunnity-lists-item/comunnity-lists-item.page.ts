import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-comunnity-lists-item',
  templateUrl: './comunnity-lists-item.page.html',
  styleUrls: ['./comunnity-lists-item.page.scss'],
})
export class ComunnityListsItemPage implements OnInit {

  userId!:string;
  communityId!:string;
  apiBase =  `http://localhost:3001/api`
  list!:any[];
  usersLists:any = {};

  listId!:string
  
  constructor(private jwtHelper: JwtHelperService,private route: ActivatedRoute, private http: HttpClient, private router: Router,private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.communityId = params['communityId'];
      this.listId = params['listId'];
    });
    this.getListCommunity().subscribe(list => {
      this.list = list;
      console.log(this.list);
    });
    this.getListsCommunity().subscribe(usersLists => {
      this.usersLists = usersLists;
    });
  }

  getListCommunity(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiBase}/itemsListUsers/${this.userId}/${this.communityId}`);
  }
  getListsCommunity(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiBase}/totalListUser/${this.communityId}/${this.userId}`);
  }

}
