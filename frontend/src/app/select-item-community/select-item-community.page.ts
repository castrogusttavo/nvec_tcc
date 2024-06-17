import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-select-item-community',
  templateUrl: './select-item-community.page.html',
  styleUrls: ['./select-item-community.page.scss'],
})
export class SelectItemCommunityPage implements OnInit {

  userId!: number;
  communityId!: number;
  itemId!: number;

  apiMeasures = "http://localhost:3001/api/measures";

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  name!: string;
  medidaSelecionada!: string;
  measure!: any[];
  quantity!: number | null;
  measure_quantity!: number | null;
  item: any = {}; // Initialize item object to hold fetched item data

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.communityId = params['communityId'];
      this.itemId = params['itemId'];
    });
    this.getItem(); // Fetch item details when component initializes
    this.getMeasures().subscribe(measures => {
      this.measure = measures;
    });
  }

  async updateItemCommunity(event: { preventDefault: () => void; }) {
    event.preventDefault();

    try {
      const response: any = await this.http.patch(
        `http://localhost:3001/api/staticItems/${this.communityId}/${this.itemId}`,
        { nm_item: this.name, id_medida: this.medidaSelecionada, qtde_medida: this.measure_quantity, qtde_item: this.quantity }
      ).toPromise();

      console.log('Item da comunidade atualizado com sucesso:', response);
      this.router.navigate(['/list-adm-community', this.userId, this.communityId]);
    } catch (err) {
      console.error('Erro ao atualizar item da comunidade:', err);
    }
  }

  getMeasures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiMeasures);
  }

  getItem(): void {
    // Fetch item details from API
    this.http.get<any>(`http://localhost:3001/api/staticItems/${this.communityId}/${this.itemId}`)
      .subscribe(
        item => {
          this.item = item;
          // Set initial values for inputs based on fetched item data
          this.name = item.nm_item;
          this.measure_quantity = item.qtde_medida;
          this.quantity = item.qtde_item;
          this.medidaSelecionada = item.id_medida;
        },
        error => {
          console.error('Erro ao buscar item da comunidade:', error);
        }
      );
  }

  deleteItem(): void {
    try {
      const response: any = this.http.delete(
        `http://localhost:3001/api/staticItems/${this.communityId}/${this.itemId}`
      ).toPromise();

      console.log('Item deletado com sucesso:', response);
      this.router.navigate(['/list-adm-community', this.userId, this.communityId]);
    } catch (err) {
      console.error('Erro ao deletar item: ', err);
    }
  }

}
