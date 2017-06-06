import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginResponse} from './login/login.response';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {ProjectsResponse} from './projects/projects.response';

@Injectable()
export class MemsourceService {
  serverUrl = 'http://localhost:8080';

  constructor(private http: Http) {
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http
      .get(this.serverUrl + `/api/v1/log?name=${username}&password=${password}`, {withCredentials: true})
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  listProjects(): Observable<ProjectsResponse> {
    return this.http
      .get(this.serverUrl + `/api/v1/projects`, {withCredentials: true})
      .map(this.extractResponse)
      .catch(this.handleError);
  }

  private extractResponse(res: Response) {
    return res.json() || {};
  }

  handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
