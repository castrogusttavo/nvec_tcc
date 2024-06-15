import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-select-item-community',
  templateUrl: './select-item-community.page.html',
  styleUrls: ['./select-item-community.page.scss'],
})
export class SelectItemCommunityPage implements OnInit {

  userId!:number;
  communityId!:number;
  itemId!:number;

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
      this.itemId = params['itemId'];
    });
    this.getMeasures().subscribe(measures => {
      this.measure = measures;
    });
  }

  async updateItemCommunity(event: { preventDefault: () => void; }) {

    event.preventDefault();

    try {
      const response: any = await this.http.patch(
        `http://localhost:3001/api/staticItems/${this.communityId}/${this.itemId}`,
        { nm_item: this.name, id_medida: this.medidaSelecionada, qtde_medida:this.measure_quantity, qtde_item:this.quantity}
      ).toPromise();

      console.log('Item da comunidade atualizado com sucesso:', response);
      this.router.navigate(['/list-adm-community',this.userId,this.communityId]);
    } catch (err) {
      console.error('Erro ao atualizar item da comunidade:', err);
    }
  }

  getMeasures():Observable<any[]>{
    return this.http.get<any[]>(this.apiMeasures);
  }

}
