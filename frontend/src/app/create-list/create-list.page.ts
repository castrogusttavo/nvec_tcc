import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.page.html',
  styleUrls: ['./create-list.page.scss'],
})
export class CreateListPage implements OnInit {

  name!:string;
  category!:any[];
  about!:string;
  address!:string;
  inputTextValue: string | undefined;
  categoriaSelecionada!:string;
  private apiCategories = 'http://localhost:3001/api/categories'

  // getCategories():Observable<any[]>{
  //   return this.http.get<any[]>(this.apiCategories);
  // }

  // // dropdownOptions: string[] = ['Kg', 'g', 'L', 'mL', 'M', 'cm'];
  // // selectedOption: string | undefined = 'Kg';
  // // dropdownVisible: boolean = false;
  // // toggleDropdown() {
  // //   this.dropdownVisible = !this.dropdownVisible;
  // // }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // this.getCategories().subscribe(categories => {
    //   this.category = categories;
    // });
  }

  // // Função para formatar o contador de caracteres
  // customCounterFormatter(inputLength: number, maxLength: number) {
  //   return inputLength > 0 ? `${inputLength} / ${maxLength}` : '';
  // }

  // // Atualiza o contador de caracteres
  // updateCounter(event: any) {
  //   const input = event.target;
  //   const maxLength = parseInt(input.getAttribute('maxlength'), 10);
  //   const currentLength = input.value.length;
  //   const counter = input.parentElement.querySelector('.counter');
  //   if (counter) {
  //     counter.textContent = currentLength > 0 ? `${currentLength} / ${maxLength}` : '';
  //   }
  // }


  // async createCommunity(event: { preventDefault: () => void; }) {
  //   event.preventDefault();

  //   console.log('Name:', this.name);
  //   console.log('Categoria:', this.category);
  //   console.log('Sobre:', this.about);
  //   console.log('address:', this.address);

  //   try {
  //     const response: any = await this.http.post(
  //       'http://localhost:3001/api/communities',
  //       { nm_comunidade: this.name, id_categoria: this.categoriaSelecionada, sb_comunidade:this.about, end_comunidade:this.address }
  //     ).toPromise();

  //     console.log('Comunidade criada com sucesso:', response);
  //     this.router.navigate(['/tabs/tab4']);
  //   } catch (err) {
  //     console.error('Erro ao criar comunidade:', err);
  //   }
  // }

}
