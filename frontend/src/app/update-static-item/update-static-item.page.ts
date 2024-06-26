
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-update-static-item',
  templateUrl: './update-static-item.page.html',
  styleUrls: ['./update-static-item.page.scss'],
})
export class UpdateStaticItemPage implements OnInit {

    userId!:number;
    communityId!:number;
  
    apiMeasures = "http://localhost:3001/api/measures"
  
    constructor(private jwtHelper: JwtHelperService,private route: ActivatedRoute, private http: HttpClient, private router: Router,private formBuilder: FormBuilder) {}
  
    name!:string;
    medidaSelecionada!:string;
    measure!:any[];
    quantity!:number;
    measure_quantity!:number;
  
  
    ngOnInit() {
      this.route.params.subscribe(params => {
        this.userId = params['userId'];
        this.communityId = params['communityId'];
      });
      this.getMeasures().subscribe(measures => {
        this.measure = measures;
      });
    }
  
    // async updateItemCommunity(event: { preventDefault: () => void; }) {
  
    //   event.preventDefault();
  
    //   console.log('Name: ', this.name);
    //   console.log('Medida: ', this.medidaSelecionada);
    //   console.log('Id do usuário: ', this.userId);
  
    //   try {
    //     const response: any = await this.http.patch(
    //       `http://localhost:3001/api/staticItems/${this.userId}/${this.communityId}`,
    //       { nm_item: this.name, id_medida: this.medidaSelecionada, qtde_medida:this.measure_quantity, qtde_item:this.quantity}
    //     ).toPromise();
  
    //     console.log('Item da comunidade inserido com sucesso:', response);
    //     this.router.navigate(['/list-adm-community',this.userId,this.communityId]);
    //   } catch (err) {
    //     console.error('Erro ao inserir item da comunidade:', err);
    //   }
    // }
  
    getMeasures():Observable<any[]>{
      return this.http.get<any[]>(this.apiMeasures);
    }
  
   
  
  }
  