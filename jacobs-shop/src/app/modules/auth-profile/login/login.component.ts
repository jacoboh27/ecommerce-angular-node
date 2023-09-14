import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = "";
  password: string = "";
  showPassword: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    //console.log(this.authService.user);
    if(this.authService.user){
      this.router.navigate(["/"]);
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  login(){
    if(!this.email){
      this.toastr.error('¡Es necesario ingresar el correo!');
      return;
    }
    if(!this.password){
      this.toastr.error('¡Es necesario ingresar la contraseña!');
      return;
    }
    this.authService.login(this.email,this.password).subscribe((resp:any) => {
      if(!resp.error && resp){
        this.router.navigate(["/"]);
      }else{
        this.toastr.error(`${resp.error.message}`, 'Correo o contraseña incorrecta!');
      }
    })
  }
}
