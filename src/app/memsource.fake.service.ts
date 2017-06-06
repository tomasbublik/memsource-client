import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginResponse} from './login/login.response';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ProjectsResponse} from './projects/projects.response';
import 'rxjs/add/observable/of';

const MOCK_LOGIN_IO_ERROR = {'success': false, 'reason': 'IO error occurred'};
const MOCK_LOGIN_SUCCESS = {'success': true, 'reason': ''};

@Injectable()
export class MemsourceFakeService {
  serverUrl = 'http://localhost:8080';

  fakeLoginResponse: LoginResponse;

  constructor() {
  }

  login(username: string, password: string): Observable<LoginResponse> {
    this.fakeLoginResponse = JSON.parse(JSON.stringify(MOCK_LOGIN_IO_ERROR));
    if (username !== '' && password !== '') {
      this.fakeLoginResponse = JSON.parse(JSON.stringify(MOCK_LOGIN_SUCCESS));
    }
    return Observable.of(this.fakeLoginResponse);
  }

  listProjects(): Observable<ProjectsResponse> {
    return Observable.of(new ProjectsResponse());
  }
}
