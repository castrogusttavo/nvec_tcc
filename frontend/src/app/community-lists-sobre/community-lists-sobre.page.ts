import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-community-lists-sobre',
  templateUrl: './community-lists-sobre.page.html',
  styleUrls: ['./community-lists-sobre.page.scss'],
})
export class CommunityListsSobrePage implements OnInit {

  constructor(private jwtHelper: JwtHelperService,private route: ActivatedRoute, private http: HttpClient, private router: Router,private formBuilder: FormBuilder) {}
  public segmentValue: string = 'segment'; 

  @Input() userName!:string;
  @Input() listAddress!:string;
  @Input() totalList!:string;
  @Input() usersName!:string;
  @Input() creatorName!:string;
  @Input() description!:string;
  @Input() category!:string;
  @Input() communityName!:string;
  
  segmentChanged(event: any){
    console.log("Segment changed:", event.detail.value);
    this.segmentValue = event.detail.value;
  }
  userId!:number;
  communityId!:number;
  

  public listaId!: string;
  
  items!: any[];
  community:any = {}; 
  categories!:any[];
  users!:any[];
  apiList =  `http://localhost:3001/api/list`
  apiCategories = "http://localhost:3001/api/categories"
  apiItems='http://localhost:3001/api/items'
  apiMeasures = "http://localhost:3001/api/measures"
  apiStatus = "http://localhost:3001/api/status"
  apiCommunity = "http://localhost:3001/api/communities"
  measures!:any[];
  status!:any[];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.communityId = params['communityId'];
    });
    this.getCommunity();
  }

  
  getCommunity(): void {
    if(this.communityId){
      const apiCommunity =  `${this.apiCommunity}/${this.communityId}`;
    
      forkJoin({
        community: this.http.get<any>(apiCommunity),
        categories: this.http.get<any[]>(this.apiCategories)

      }).subscribe(
        ({ community, categories }) => {
          this.categories = categories; 

          const category = this.categories.find(
            categoria => categoria.id_categoria === community.id_categoria
          );

          this.community={
            ...community,
            ds_categoria: category ? category.ds_categoria : 'Categoria Desconhecida',
          }

          console.log("comunidade",this.community)
        },
        error => {
          console.error('Erro ao buscar dados:', error);
        }
      );
    } else{
      console.error("Id não encontrado")
    }
  }

}