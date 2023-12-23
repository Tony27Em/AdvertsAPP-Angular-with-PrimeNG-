import { Component } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { User } from 'src/shared/interfaces/user';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  providers: [MessageService],
})
export class EditComponent {
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

  regexPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?!.*\s).{8,20}$/;
  isPasswordValid: boolean = false;
  showInputPasswordMessage: boolean = false;

  isSuccess: boolean = false;

  currentPassword: string = ''
  newPassword: string = ''

  constructor(
    private authServ: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  checkPassword(): void {    
    this.isPasswordValid = this.regexPassword.test(this.newPassword);
    this.showInputPasswordMessage = !(this.newPassword == '' || this.isPasswordValid);
  }

  edit(): void {    
    if(this.isPasswordValid && this.currentPassword === this.user.password) {
      this.authServ.editUser({...this.user});
      this.isSuccess = true;
      this.messageService.add({ severity: 'success', summary: 'Дело сделано!', detail: 'Ваши данные успешно изменены' });
      setTimeout(() => this.router.navigate(['/private']), 1500);
    }
  }

  cancel() {
    this.messageService.add({ severity: 'info', summary: 'Отмена!', detail: 'Ваши данные не изменились' });
    this.isSuccess = true;
    setTimeout(() => this.router.navigate(['/private']), 1500)
  }

  ngOnInit() {
    this.user = this.authServ.currentUser;
  }
}
