import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { LoginRequest, LoginResponse } from '../../interfaces/login';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  router = inject(Router);



  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {

    if (this.usuarioService.isLogged())

      this.router.navigate(['/dashboard']);

  }
  submitLogin() {

    const usuario = this.loginForm.get('usuario')?.value;
    const password = this.loginForm.get('password')?.value;

    if (usuario && password) {
      const usuarioRequest: LoginRequest = {
        usuario: usuario,
        password: password
      };

      this.usuarioService.getLogin(usuarioRequest).subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error('El usuario o la contraseña están vacíos');
    }
  }

}
