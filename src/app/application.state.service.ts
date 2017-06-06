import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class ApplicationState {
  public _subject = new Subject<any>();
  public event = this._subject.asObservable();

  public publish(data: any) {
    this._subject.next(data);
  }
}
