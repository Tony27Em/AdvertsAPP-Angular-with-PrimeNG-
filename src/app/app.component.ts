import { Component } from '@angular/core';
import { AuthService } from 'src/shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuthorized: boolean = false;

  constructor(
    private authServ: AuthService,
  ) {}
  
  ngOnInit() {
    this.authServ.accessData$.subscribe(access => {
      this.isAuthorized = access;
    });
  }
}
