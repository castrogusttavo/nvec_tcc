import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {

  apiMeasures = "http://localhost:3001/api/measures"
  measures!:any[];
  medidaSelecionada!:string;

  name!:string;
  price!:string;
  quantity!:string;

  listaId!:number;


  constructor(private route: ActivatedRoute,private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listaId = params['id'];
    });
    this.getMeasures().subscribe(categories => {
      this.measures = categories;
    });
  }

  getMeasures():Observable<any[]>{
    return this.http.get<any[]>(this.apiMeasures);
  }

  async createItem(event: { preventDefault: () => void; }) {
    event.preventDefault();

    console.log('Name:', this.name);
    console.log('Valor Unitário:', this.price);
    console.log('Quantidade:', this.quantity);

    try {
      const response: any = await this.http.post(
        'http://localhost:3001/api/items',
        { nm_item: this.name, vl_uni:this.price,id_medida:this.medidaSelecionada, qtde_item:this.quantity,id_lista:this.listaId }
      ).toPromise();

      console.log('Lista criada com sucesso:', response);
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao criar lista:', err);
    }
  }

}
