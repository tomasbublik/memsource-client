import {Component} from '@angular/core';
import {ApplicationState} from './application.state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Memsource client application!';
  loggedIn = false;

  constructor(private applicationState: ApplicationState) {
    applicationState.event.subscribe((login) => {
      console.log(login);
      this.loggedIn = true;
    });
  }
}
