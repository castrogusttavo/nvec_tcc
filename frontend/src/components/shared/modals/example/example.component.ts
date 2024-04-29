import { Component, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { Item } from './types';

@Component({
  selector: 'app-example',
  templateUrl: 'example.component.html',
})
export class ExampleComponent {
  @ViewChild('modal', { static: true }) modal!: IonModal;

  selectedFruitsText = 'Categoria';
  selectedFruits: string[] = [];

  fruits: Item[] = [
    { "text": "Acessórios para Veículos", "value": "acessorios-para-veiculos" },
    { "text": "Animais de estimação", "value": "animais-estimacao" },
    { "text": "Artigos", "value": "artigos" },
    { "text": "Artigos para Jardim", "value": "artigos-jardim" },
    { "text": "Artigos Esportivos", "value": "artigos-esportivos" },
    { "text": "Brinquedos", "value": "brinquedos" },
    { "text": "Calçados", "value": "calcados" },
    { "text": "Casa e Decoração", "value": "casa-decoracao" },
    { "text": "Cosméticos", "value": "cosmeticos" },
    { "text": "Eletrônicos", "value": "eletronicos" },
    { "text": "Ferramentas", "value": "ferramentas" },
    { "text": "Instrumentos Musicais", "value": "instrumentos-musicais" },
    { "text": "Jogos e Consoles", "value": "jogos-consoles" },
    { "text": "Livros", "value": "livros" },
    { "text": "Material de Escritório", "value": "material-escritorio" },
    { "text": "Papelaria", "value": "papelaria" },
    { "text": "Perfumes", "value": "perfumes" },
    { "text": "Produtos de Limpeza", "value": "produtos-limpeza" },
    { "text": "Roupas", "value": "roupas" },
    { "text": "Supermercado", "value": "supermercado" }
  ];

  private formatData(data: string[]) {
    if (data.length === 1) {
      const fruit = this.fruits.find((fruit) => fruit.value === data[0]);
      if (fruit) {
        return fruit.text;
      }
    }
    return `${data.length} items`;
  }
  

  fruitSelectionChanged(fruits: string[]) {
    if (fruits.length > 0) {
      this.selectedFruits = fruits;
      this.selectedFruitsText = this.formatData(this.selectedFruits);
    }
    this.modal.dismiss();
  }
  
}

