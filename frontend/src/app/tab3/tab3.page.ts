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
  user!:string;
  date:string = new Date().toISOString().split('T')[0];;

  inputTextValue: string | undefined;
  categoriaSelecionada!:string;
  private apiCategories = 'http://localhost:3001/api/categories'

  getCategories():Observable<any[]>{
    return this.http.get<any[]>(this.apiCategories);
  }

  // dropdownOptions: string[] = ['Kg', 'g', 'L', 'mL', 'M', 'cm'];
  // selectedOption: string | undefined = 'Kg';
  // dropdownVisible: boolean = false;
  // toggleDropdown() {
  //   this.dropdownVisible = !this.dropdownVisible;
  // }

  constructor(private http: HttpClient, private router: Router, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.getCategories().subscribe(categories => {
      this.category = categories;
    });
    this.getUserName();
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

    console.log('Name:', this.name);
    console.log('Categoria:', this.category);
    console.log('Descrição:', this.description);
    console.log('Endereço:', this.address);
    console.log('Valor máximo:', this.expense);
    console.log('data:', this.date);

    try {
      const response: any = await this.http.post(
        'http://localhost:3001/api/lists',
        { nm_lista: this.name, rd_lista:this.expense, ds_lista:this.description,id_categoria:this.categoriaSelecionada, id_usuario:this.user, end_lista:this.address }
      ).toPromise();

      console.log('Lista criada com sucesso:', response);
      this.router.navigate(['/tabs/tab1']);
    } catch (err) {
      console.error('Erro ao criar lista:', err);
    }
  }

  getUserName(): void {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Adicione esta linha para verificar o token no console
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      console.log('Decoded Token:', decodedToken.userId); // Adicione esta linha para verificar o token decodificado no console
      this.user = decodedToken.userId; // Supondo que o email do usuário esteja no token com a chave 'userEmail'
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
