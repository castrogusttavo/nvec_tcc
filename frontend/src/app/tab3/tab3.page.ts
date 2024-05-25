import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  name!:string;
  category!:any[];
  description!:string;
  expense!:string;
  address!:string;
  userId!:number;
  inputTextValue: string | undefined;
  categoriaSelecionada!:string;
  private apiCategories = 'http://localhost:3001/api/categories'

  getCategories():Observable<any[]>{
    return this.http.get<any[]>(this.apiCategories);
  }

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.getCategories().subscribe(categories => {
      this.category = categories;
    });
    this.getUserId();
    console.log('Id do usuário: ', this.userId)
  }

  // Função para formatar o contador de caracteres
  customCounterFormatter(inputLength: number, maxLength: number) {
    return inputLength > 0 ? `${inputLength} / ${maxLength}` : '';
  }

  // Atualiza o contador de caracteres
  updateCounter(event: any) {
    const input = event.target;
    const maxLength = parseInt(input.getAttribute('maxlength'), 10);
    const currentLength = input.value.length;
    const counter = input.parentElement.querySelector('.counter');
    if (counter) {
      counter.textContent = currentLength > 0 ? `${currentLength} / ${maxLength}` : '';
    }
  }

  async createList(event: { preventDefault: () => void; }) {
    event.preventDefault();
  
    console.log('Id do Usuário:', this.userId);
    console.log('Name:', this.name);
    console.log('Categoria:', this.category);
    console.log('Descrição:', this.description);
    console.log('Endereço:', this.address);
    console.log('Valor máximo:', this.expense);
  
    try {
      const response: any = await this.http.post(
        'http://localhost:3001/api/lists',
        { 
          nome_lista: this.name, 
          descricao_lista: this.description,
          renda_lista: this.expense, 
          endereco_lista: this.address,
          id_categoria: this.categoriaSelecionada, 
          userId: this.userId, 
        }
      ).toPromise();
  
      console.log('Lista criada com sucesso:', response);
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao criar lista:', err);
    }
  }

getUserId(): void {
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  if (token) {
    try {
      const decodedToken: any = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken); 
      if (decodedToken && decodedToken.userId) {
        this.userId = decodedToken.userId;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  } else {
    console.warn('Token not found in local storage');
  }
}
  // // Dropdown medida
  // inputTextValue: string | undefined;
  // dropdownOptions: string[] = ['Kg', 'g', 'L', 'mL', 'M', 'cm'];
  // selectedOption: string | undefined = 'Kg';
  // dropdownVisible: boolean = false;
  // toggleDropdown() {
  //   this.dropdownVisible = !this.dropdownVisible;
  // }

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

  // // FormGroup para validação dos campos de texto
  // textForm: FormGroup;

  // constructor(private formBuilder: FormBuilder) {
  //   // Inicialização do FormGroup para validação dos campos de texto
  //   this.textForm = this.formBuilder.group({
  //     valorMaximo: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //     valor: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //     medida: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //     quantidade: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
  //   });
  // }

  // // Formata o valor do campo de texto para o formato de moeda
  // formatCurrency(event: any) {
  //   let input = event.target;
  //   let value = input.value.replace(/\D/g, '');
  //   value = value.replace(/^0+/, '');
  //   value = value.replace(/(\d)(\d{2})$/, '$1,$2');
  //   value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
  //   input.value = value;
  // }
}
