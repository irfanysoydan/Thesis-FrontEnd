import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isError: boolean = false;
  message: string = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private localStore: LocalService
  ) {}
  ngOnInit(): void {}
  login(idNumber: string, pass: string) {
    let user: User = new User();
    if (
      typeof idNumber != 'undefined' &&
      typeof pass != 'undefined' &&
      idNumber.trim() != '' &&
      pass.trim() != ''
    ) {
      user.idNumber = Number(idNumber);
      user.password = pass;
      this.authService.loginUser(user).subscribe((loginUser) => {
        if (loginUser.token == null || loginUser.token.trim() == '') {
          this.message = 'Kimlik numarası veya şifre hatalı !';
          this.isError = true;
        } else {
          this.isError = false;
          this.localStore.saveData('id', loginUser.id);
          this.localStore.saveData('token', loginUser.token);
          this.localStore.saveData('isLoggedIn', '1');

          this.router.navigate(['/home']).then(() => {
            window.location.reload();
          });
        }
      });
    } else {
      this.message = 'Kimlik numarası veya şifre boş olamaz';
      this.isError = true;
    }
  }
}
