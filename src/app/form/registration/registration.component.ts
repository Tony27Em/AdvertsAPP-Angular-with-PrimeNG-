import { Component } from '@angular/core';
import { User } from 'src/shared/interfaces/user';
import { AuthService } from 'src/shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [MessageService],
})
export class RegistrationComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    gender: 'male',
    age: null,
    phone: '',
    favorites: [],
  }

  genderOptions: Array<{}> = [
    {label: 'Муж', value: 'male'}, 
    {label: 'Жен', value: 'female'},
  ];

  regexName: RegExp = /^(?=.*[a-zA-Zа-яА-ЯёЁ])[\sa-zA-Zа-яА-ЯёЁ]{3,20}$/;
  regexEmail: RegExp = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  regexPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s).{8,20}$/;

  isNameValid: boolean = false;
  isEmailValid: boolean = false;
  isPasswordValid: boolean = false;

  showInputNameMessage: boolean = false;
  showInputEmailMessage: boolean = false;
  showInputPasswordMessage: boolean = false;

  matchesArray: boolean[] = [];
  isNameExist: boolean = false;
  isEmailExist: boolean = false;

  isSuccess: boolean = false;

  constructor(
    private authServ: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  showWarningMessage(param_1: string, param_2: boolean, status: boolean): boolean {    
    return status = !(param_1 == '' || param_2);
  }

  checkInputs(): void {    
    this.isNameValid = this.regexName.test(this.user.name);
    this.isEmailValid = this.regexEmail.test(this.user.email);
    this.isPasswordValid = this.regexPassword.test(this.user.password);

    this.showInputNameMessage = this.showWarningMessage(this.user.name, this.isNameValid, this.showInputNameMessage);
    this.showInputEmailMessage = this.showWarningMessage(this.user.email, this.isEmailValid, this.showInputEmailMessage);
    this.showInputPasswordMessage = this.showWarningMessage(this.user.password, this.isPasswordValid, this.showInputPasswordMessage);

    this.isNameExist = false;
    this.isEmailExist = false;
  }

  registrate(): void {    
    if(this.isNameValid && this.isEmailValid && this.isPasswordValid) {
      this.matchesArray = this.authServ.addUser({...this.user});

      if(!this.matchesArray.includes(true)) {
        this.isSuccess = true;
        this.messageService.add({ severity: 'success', summary: 'Ура!', detail: 'Вы успешно зарегистрировались' });
        setTimeout(() => this.router.navigate(['/form/authorization']), 1500)
      } else {
        this.isNameExist = this.matchesArray[0];
        this.isEmailExist = this.matchesArray[1];        
      }
    }
  }
}
