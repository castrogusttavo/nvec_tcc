import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ItemService } from '../service/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {

  apiMeasures = "http://localhost:3001/api/measures";
  apiItems = 'http://localhost:3001/api/items'; // Certifique-se de que a URL está correta
  measures!: any[];
  medidaSelecionada!: string;

  name!: string;
  price!: number;
  quantity!: number;
  quantity_measure!: number;

  listaId!: number;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService, private itemService: ItemService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listaId = params['id'];
    });
    this.getMeasures().subscribe(measures => {
      this.measures = measures;
    });
  }

  getMeasures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiMeasures);
  }

  async createItem(event: { preventDefault: () => void; }) {
    event.preventDefault();

    console.log('Name:', this.name);
    console.log('Valor Unitário:', this.price);
    console.log('Quantidade:', this.quantity);

    try {
      const response: any = await this.http.post(
        this.apiItems,
        { nm_item: this.name, vl_uni: this.price, id_medida: this.medidaSelecionada, qtde_medida_item: this.quantity_measure, qtde_item: this.quantity, id_lista: this.listaId }
      ).toPromise();

      console.log('Item criado com sucesso:', response);
      
      // Requisição adicional para buscar detalhes completos do item recém-criado, se necessário
      const itemDetails: any = await this.http.get(`${this.apiItems}/${response.id_item}`).toPromise();
      
      console.log('Detalhes do item:', itemDetails);
      this.itemService.addItem(itemDetails); // Adicione o novo item ao serviço com detalhes completos
      this.router.navigate(['/lists-items', this.listaId]);
    } catch (err) {
      console.error('Erro ao criar item:', err);
    }
  }
}
