import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-comunnity',
  templateUrl: './create-comunnity.page.html',
  styleUrls: ['./create-comunnity.page.scss'],
})
export class CreateComunnityPage implements OnInit {

  name:string = "";
  category:string = "";
  about:string = "";

  inputTextValue: string | undefined;

  // dropdownOptions: string[] = ['Kg', 'g', 'L', 'mL', 'M', 'cm'];
  // selectedOption: string | undefined = 'Kg';
  // dropdownVisible: boolean = false;
  // toggleDropdown() {
  //   this.dropdownVisible = !this.dropdownVisible;
  // }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    
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


  async createCommunity(event: { preventDefault: () => void; }) {
    event.preventDefault();

    console.log('Name:', this.name);
    console.log('Categoria:', this.category);
    console.log('Sobre:', this.about);

    try {
      const response: any = await this.http.post(
        'http://localhost:3001/api/communities',
        { nm_comunidade: this.name, id_categoria: this.category, sb_comunidade:this.about }
      ).toPromise();

      console.log('Comunidade criada com sucesso:', response);
      this.router.navigate(['/tabs/tab4']);
    } catch (err) {
      console.error('Erro ao criar comunidade:', err);
    }
  }

}
