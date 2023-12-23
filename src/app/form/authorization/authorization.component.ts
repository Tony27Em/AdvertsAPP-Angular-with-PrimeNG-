import { Component } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  providers: [MessageService],
})
export class AuthorizationComponent {
  username: string = '';
  password: string = '';
  isFailure: boolean = false;
  isSuccess: boolean = false;

  constructor(
    private authServ: AuthService,
    private messageService: MessageService,
    private router: Router,
  ) {}

  authorization(): void {
    if(this.authServ.checkAuthorization(this.username, this.password)) {
      this.messageService.add({ severity: 'success', summary: 'Данные подтверждены!', detail: 'Вы успешно авторизовались' });     
      this.authServ.accessIsOpen();
      setTimeout(() => this.router.navigate(['/']), 1500)
    } else {
      this.isFailure = true;
    }
  }
  
  retry(): void {
    this.isFailure = false;
  }

  ngOnInit() {
    this.authServ.accessData$.subscribe(access => {
      this.isSuccess = access;
    })
  }
}
