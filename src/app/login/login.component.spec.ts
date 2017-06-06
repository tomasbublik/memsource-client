/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {MemsourceService} from '../memsource.service';
import {ApplicationState} from '../application.state.service';
import {MemsourceFakeService} from '../memsource.fake.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [{provide: MemsourceService, useClass: MemsourceFakeService}, ApplicationState],
      declarations: [LoginComponent],
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should no set loginResponse when no login is executed', () => {
    expect(component.loginResponse).toBeUndefined();
  });

  it('should set loginResponse when login is executed', () => {
    component.doLogin('', '');
    expect(component.loginResponse).toBeDefined();
  });

  it('should set positive loginResponse when successful login is executed', () => {
    component.doLogin('aaa@bbb.ccc', 'ppp');
    expect(component.loginResponse).toBeDefined();
    expect(component.loginResponse.success).toBeTruthy();
  });
});
