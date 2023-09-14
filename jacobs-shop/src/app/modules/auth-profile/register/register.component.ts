import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  email: string = "";
  name: string = "";
  surname: string = "";
  password: string = "";
  confirmPassword: string = "";
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    public authServices:AuthService,
    public router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    if(this.authServices.user){
      this.router.navigate(["/"]);
    }
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  registerUser() {
    if (!this.email || !this.name || !this.surname || !this.password || !this.confirmPassword){
       this.toastr.error('¡Es necesario ingresar todos los campos!');
       return;
    }
    if (this.password != this.confirmPassword){
      this.toastr.error('¡Las contraseñas no coinciden!');
      return;
    }
    let data = {
      email: this.email,
      name: this.name,
      surname: this.surname,
      password: this.password,
      rol: 'cliente',
    };
    this.authServices.registerUser(data).subscribe((resp:any) => {
      if (!resp.error && resp){
        this.toastr.success('Ahora puedes iniciar sesión', '¡Tu cuenta fue creada con éxito!');
        this.router.navigate(["/auth/login"]);
      } else {
        this.toastr.error(`${resp.error.message}`, '¡Ocurrio un error!');
      }
    });
  }
}
