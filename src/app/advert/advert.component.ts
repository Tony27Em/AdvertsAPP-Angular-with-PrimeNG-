import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Advert } from 'src/shared/interfaces/advert';
import { HttpService } from 'src/shared/services/http.service';
import { AuthService } from 'src/shared/services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-advert',
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss'],
  providers: [MessageService],
})

export class AdvertComponent { 
  adverts: Advert[] = [];
  advert: Advert = {
    id: 0,
    userid: 0,
    username: '',
    phone: 0,
    title: '',
    info: [],
    price: 0,
    description: '',
    date: '',
    images: [],
    comments: [],
    isFavorite: false,
  }
  images: string[] = [];
  comment: string = '';
  isAuthorized: boolean = false;
  isFavorite: boolean = false;

  constructor(
    private httpServ: HttpService,
    private authServ: AuthService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) {}

  getAdvert(): void {  
    this.activatedRoute.params.subscribe(param => {      
      this.httpServ.getData().subscribe(adverts => {
        this.advert = adverts.find(item => item.id === +param['id'])!
        let tempAdvert = this.httpServ.adverts.find(item => item.id === +param['id'])!
        if(this.isAuthorized) this.isFavorite = tempAdvert.isFavorite

        if(this.advert.comments.length != tempAdvert.comments.length) this.advert = tempAdvert

        this.images = this.advert.images;
      })
    })      
  }

  addComment(): void {      
    if(this.isAuthorized && this.comment !== '') {
      let commentData = {
        id: this.authServ.generateID(this.advert.comments),
        userid: this.authServ.currentUser.id,
        author: this.authServ.currentUser.name,
        text: this.comment,
        date: new Date().toLocaleDateString(),
      }
      
      this.httpServ.addComment(this.advert.id, commentData)
      this.advert = this.adverts.find(adv => adv.id === this.advert.id)!
      this.comment = '';
    }
  }

  addFavorites(favorite: Advert): void {
    if(this.isAuthorized) {
      this.isFavorite = this.httpServ.addFavorites(favorite);
      if(this.isFavorite) {
        this.messageService.add({ severity: 'success', summary: 'Добавлено в избранное', detail: 'Для просмотра перейдите в личный кабинет' });
      } else {
        this.messageService.add({ severity: 'warn', summary: 'Удалено из избранного', detail: 'Для просмотра перейдите в личный кабинет' });
      }
    }
  }

  navigate(id: number) {
    if(this.authServ.currentUser.id === id) {
      this.router.navigate(['/private']);
    } else {
      this.router.navigate(['/user', id]);
    }
  }

  ngOnInit(): void {    
    this.authServ.accessData$.subscribe(access => {
      this.isAuthorized = access;
    })
    
    this.httpServ.advertsData$.subscribe(adverts => {
      this.adverts = adverts;
    })

    this.getAdvert();
  }  
}
