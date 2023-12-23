import { Component } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';
import { HttpService } from 'src/shared/services/http.service';
import { User } from 'src/shared/interfaces/user';
import { Advert } from 'src/shared/interfaces/advert';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss'],
  providers: [MessageService],
})
export class PrivateComponent {
  currentUser: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    gender: '',
    age: 0,
    phone: '',
    favorites: [],
  } 
  adverts: Advert[] = []; 
  value: boolean = false
  isQuit: boolean = false

  constructor(
    private authServ: AuthService,
    private httpServ: HttpService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  changeCategory(bool: boolean): void {
    this.value = bool;
  }

  edit() {
    this.router.navigate(['/edit'])
  }

  quit() {
    this.currentUser = {
      id: 0,
      name: '',
      email: '',
      password: '',
      gender: '',
      age: 0,
      phone: '',
      favorites: [],
    };
    this.authServ.currentUser = this.currentUser;
    this.authServ.isAuthorized = false;
    this.authServ.accessIsOpen();
    this.isQuit = true;
    this.messageService.add({ severity: 'info', summary: 'До свидания!', detail: 'До скорых встреч' });
    setTimeout(() => this.router.navigate(['/']), 1500)
  }

  ngOnInit(): void {
    this.currentUser = this.authServ.currentUser;

    this.httpServ.getData().subscribe(adverts => {
      this.adverts = adverts.filter(item => item.userid === this.currentUser.id);
    })

    this.httpServ.advertsData$.subscribe(adverts => {
      this.adverts = adverts.filter(item => item.userid === this.currentUser.id);
      this.currentUser.favorites = adverts.filter(item => item.isFavorite === true);
    })
  }
}
