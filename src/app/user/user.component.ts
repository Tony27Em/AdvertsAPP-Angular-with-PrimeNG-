import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/shared/interfaces/user';
import { Advert } from 'src/shared/interfaces/advert';
import { AuthService } from 'src/shared/services/auth.service';
import { HttpService } from 'src/shared/services/http.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    gender: '',
    age: 0,
    phone: '',
    favorites: [],
  }
  adverts: Advert[] = []

  constructor(
    private authServ: AuthService,
    private httpServ: HttpService,
    private activatedRoute: ActivatedRoute,
  ) {}

  getUserData(): void {    
    this.activatedRoute.params.subscribe(param => {
      this.authServ.getUsers().subscribe(users => {
        this.user = users.find(user => user.id === +param['id'])!
      })

      this.httpServ.getData().subscribe(adverts => {
        this.adverts = adverts.filter(adv => adv.userid === +param['id'])
      })
    })
  }

  ngOnInit(): void {
    this.getUserData();    
  }
}
