import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isError: boolean = false;
  message: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  register(
    idnumber: string,
    firstname: string,
    lastname: string,
    birthyear: string,
    pass: string
  ) {
    if (
      typeof idnumber != 'undefined' &&
      typeof firstname != 'undefined' &&
      typeof lastname != 'undefined' &&
      typeof birthyear != 'undefined' &&
      typeof pass != 'undefined'
    ) {
      if (idnumber == null) {
        this.message = 'Kimlik numaranız boş olamaz.';
        this.isError = true;
      } else if (firstname.trim() == '') {
        this.message = 'Adınız boş olamaz.';
        this.isError = true;
      } else if (lastname.trim() == '') {
        this.message = 'Soyadınız boş olamaz.';
        this.isError = true;
      } else if (birthyear == null) {
        this.message = 'Doğum Yılınız boş olamaz.';
        this.isError = true;
      } else if (pass.trim() == '') {
        this.message = 'Şifre boş olamaz.';
        this.isError = true;
      } else if (pass.length < 8) {
        this.message = 'Şifre en az 8 karakter olmalıdır.';
        this.isError = true;
      } else {
        let user: User = new User();
        user.idNumber = Number(idnumber);
        user.firstName = firstname;
        user.lastName = lastname;
        user.birthYear = Number(birthyear);
        user.password = pass;
        this.authService.registerUser(user).subscribe((response) => {
          console.log(response);
          if (response.isSuccessful) {
            Swal.fire(
              'Kayıt Başarılı',
              'Başarılı bir şekilde kayıt olundu!',
              'success'
            );
            this.router.navigate(['/login']);
          } else {
            Swal.fire('Hata', 'Kayıt olurken hata oluştu!', 'error');
            this.message = 'Kayıt olma başarısız.';
            this.isError = true;
          }
        });
      }
    }
  }
}