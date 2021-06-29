import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal', { static: true }) slides: IonSlides;



  loginUser = {
    email: 'ravalosv@gmail.com',
    password: '123456'
  };

  registerUser: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor(private usuarioService: UsuarioService,
    private navCtrl: NavController,
    private uiService: UiServiceService) { }

  ngOnInit() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (!fLogin.valid) { return; };

    const valido = await this.usuarioService.login(this.loginUser.email, this.loginUser.password);

    if (valido) {
      // navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // mostrar alesta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Usuario/Contraseña incorrectos ');
    }
  }

  async registro(fRegistro: NgForm) {
    if (!fRegistro.valid) { return; };

    console.log(fRegistro.valid);

    const valido = await this.usuarioService.registro(this.registerUser);

    if (valido) {
      // navegar al tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated: true });
    } else {
      // mostrar alesta de usuario y contraseña no correctos
      this.uiService.alertaInformativa('Ese correo electronico ya existe');
    }
  }



  mostrarRegistro() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(0);
    this.slides.lockSwipes(true);

  }
  mostrarLogin() {
    this.slides.lockSwipes(false);
    this.slides.slideTo(1);
    this.slides.lockSwipes(true);

  }
}
