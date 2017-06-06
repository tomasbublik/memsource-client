import {Component, OnInit} from '@angular/core';
import {MemsourceService} from '../memsource.service';
import {LoginResponse} from './login.response';
import {ApplicationState} from '../application.state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = '';
  loginResponse: LoginResponse;
  errorMessage: string;

  constructor(private memsourceService: MemsourceService, private applicationState: ApplicationState) {
  }

  ngOnInit() {
    this.status = 'Not logged in';
  }

  doLogin(name, password): void {
    this.memsourceService
      .login(name, password)
      .subscribe(loginResponse => {
          this.loginResponse = loginResponse;
          if (this.loginResponse.success) {
            this.applicationState.publish({login: 'success'});
          }
        },
        error => this.errorMessage = <any>error);
  }
}
