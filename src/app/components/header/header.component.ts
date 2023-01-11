import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLogin: boolean = false;
  isAdmin: boolean = false;
  constructor(private router: Router, private localStore: LocalService) {}

  ngOnInit(): void {
    this.isLogin = this.localStore.getData('isLoggedIn') == '1' ? true : false;
    this.isAdmin = this.localStore.getData('isAdmin') == '1' ? true : false;
  }

  public Logout() {
    this.localStore.clearData();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
