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

  usersCommunity!:any[];

  apiBase =  `http://localhost:3001/api`

  apiList =  `http://localhost:3001/api/list`
  apiCategories = "http://localhost:3001/api/categories"
  apiItems='http://localhost:3001/api/items'
  apiMeasures = "http://localhost:3001/api/measures"
  apiStatus = "http://localhost:3001/api/status"
  apiCommunity = "http://localhost:3001/api/communities"
  apiUsers = "http://localhost:3001/api/users"
  measures!:any[];
  status!:any[];

  resultComparacao:any;
  divComparacao:boolean=false;

  lists!:any[];
  usersLists!:any[];
  totalLista!:any[];

  idCriador!:string;

  ngOnInit() {
    this.getUserId();
    this.route.params.subscribe(params => {
      this.communityId = params['communityId'];
    });
    this.getCommunity();
    this.getUsersCommunity().subscribe(usersCommunity => {
      this.usersCommunity = usersCommunity;
    });
    this.getListCommunity().subscribe(lists => {
      this.lists = lists;
    });
    this.getListsCommunity().subscribe(usersLists => {
      this.usersLists = usersLists;
    });

  }

  getUserId(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      this.userId = decodedToken.userId;
    }
  }

  
  getCommunity(): void {
    if(this.communityId){
      const apiCommunity =  `${this.apiCommunity}/${this.communityId}`;
    
      forkJoin({
        community: this.http.get<any>(apiCommunity),
        categories: this.http.get<any[]>(this.apiCategories),
        users: this.http.get<any[]>(this.apiUsers)
      }).subscribe(
        ({ community, categories,users }) => {
          this.categories = categories; 
          this.users = users;

          const category = this.categories.find(
            categoria => categoria.id_categoria === community.id_categoria
          );

          const user = this.users.find(
            user =>user.id_usuario === community.id_criador
          )

          this.idCriador = user;

          this.community={
            ...community,
            ds_categoria: category ? category.ds_categoria : 'Categoria Desconhecida',
            nm_usuario: user ? user.nm_usuario : 'Criador desconhecido'
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

  getUsersCommunity(): Observable<any[]>{
      return this.http.get<any[]>(`${this.apiBase}/userCommunity/${this.communityId}`);
  }

  getListCommunity(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiBase}/listCommunity/${this.userId}/${this.communityId}`);
  }

  getListsCommunity(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiBase}/totalListUsers/${this.communityId}`);
  }


  navigateToCommunityPage(communityId: number, creatorId: number): void {

    const user = String(this.userId);
    const creator = String(creatorId);

    if (user === creator) {
        this.router.navigate(['/list-adm-community', user, communityId]);
    } else {
      console.log(user, creator);
        this.router.navigate(['/tabs/tab4']);
    }
  }

  async procedureComparacao() {
    try {
      const result = await this.http.get<any>(`${this.apiBase}/comparacao/${this.communityId}`).toPromise();
      this.resultComparacao = result;
      this.divComparacao = true;
      console.log(this.resultComparacao)
    } catch (error) {
      console.error('Erro ao chamar a procedure de comparação:', error);
    }
  }
  

}