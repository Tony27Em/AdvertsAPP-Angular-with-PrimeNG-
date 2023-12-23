import { Component } from '@angular/core';
import { HttpService } from 'src/shared/services/http.service';
import { Advert } from 'src/shared/interfaces/advert';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [MessageService],
})
export class MainComponent {
  advertData: Advert[] = [];
  reserveArray: Advert[] = [];
  isFavorite: boolean = false;
  isAuthorized: boolean = false;
  searchText: string = '';
  nothingFound: boolean = false;

  constructor(
    private authServ: AuthService,
    private httpServ: HttpService,
    private messageService: MessageService,
  ) {}

  getAllAdvert(): void {    
    if(this.httpServ.adverts.some(item => item.isFavorite == true) && this.isAuthorized) {
      this.advertData = this.httpServ.adverts;      
    } else {
      this.httpServ.getData().subscribe(data => {
        this.advertData = data;
        this.reserveArray = data;
      })
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

  search(): void {
    if(this.searchText !== ''){
      this.advertData = this.reserveArray.filter(item => item.title.toLowerCase().includes(this.searchText.toLowerCase()));      
      if(!this.advertData.length) this.nothingFound = true; 
    }    
  }

  reset(): void {
    this.advertData = this.reserveArray;
    this.searchText = '';
    this.nothingFound = false;
  }

  ngOnInit(): void {    
    this.authServ.accessData$.subscribe(access => {
      this.isAuthorized = access;
    })
    
    this.httpServ.advertsData$.subscribe(adverts => {
      this.advertData = adverts;
      this.reserveArray = adverts;
    })

    this.getAllAdvert();
  }
}
