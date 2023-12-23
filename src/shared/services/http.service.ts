import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Advert, Comment } from '../interfaces/advert';

@Injectable({
  providedIn: 'root'
})
export class HttpService {  
  adverts: Advert[] = [];
  favorites: Advert[] = [];

  advertsChange = new BehaviorSubject<Advert[]>(this.adverts)
  advertsData$ = this.advertsChange.asObservable();

  favoritesChange = new BehaviorSubject<Advert[]>(this.favorites);
  favoritesData$ = this.favoritesChange.asObservable();

  constructor(
    private http: HttpClient,
  ) {
    this.http.get<Advert[]>('../assets/adverts.json').subscribe(data => {
      this.adverts = data;
    })
  }

  getData(): Observable<Advert[]> {    
    return this.http.get<Advert[]>('../assets/adverts.json');
  }

  addComment(id: number, commentData: Comment): void {
    let advert = this.adverts.find(item => item.id === id)!; 
    advert.comments.push(commentData);
    this.advertsChange.next(this.adverts);
  }

  addFavorites(favorite: Advert): boolean {
    this.adverts.forEach(item => {
      if(item.id === favorite.id) item.isFavorite = !item.isFavorite
    })    
    this.advertsChange.next(this.adverts);
    this.favoritesChange.next(this.favorites);
    return this.adverts.find(item => item.id === favorite.id)!.isFavorite    
  }

  ngOnInit(): void {
    this.getData();    
  }
}
