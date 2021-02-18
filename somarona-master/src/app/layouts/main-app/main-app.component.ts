import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss']
})
export class MainAppComponent implements OnInit {
  userInfo: any;
  constructor(private af: AngularFireAuth, private router: Router) { 
    this.getUserInfo();
  }

  ngOnInit() {
    // this.logout();
  }

  async logout() {
    await this.af.auth.signOut();
    this.router.navigate(['/auth']);
  }

  getUserInfo() {
    this.af.authState.subscribe((state) => {
      const data: any[] = state.providerData;
      this.userInfo = data[0];
    });
  }

}
