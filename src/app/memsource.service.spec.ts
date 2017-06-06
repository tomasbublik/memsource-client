/* tslint:disable:no-unused-variable */
import {inject, TestBed} from '@angular/core/testing';
import {MemsourceService} from './memsource.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BaseRequestOptions, Http, RequestMethod, Response, ResponseOptions} from '@angular/http';

const MOCK_LOGIN_IO_ERROR = {'success': false, 'reason': 'IO error occurred'};
const MOCK_LOGIN_SUCCESS = {'success': true, 'reason': ''};
const MOCK_PROJECTS_RESPONSE = {
  'projectModels': [{
    'name': 'Nejlepší projekt na světě',
    'sourceLanguage': 'cs',
    'targetLanguage': '[la, li, ln, lo][la, li, ln, lo][la, li, ln, lo][la, li, ln, lo]',
    'status': 'NEW'
  }], 'reason': null, 'success': true
};

describe('MemsourceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemsourceService, MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        }],
    });
  });

  it('should create service', inject([MemsourceService], (service: MemsourceService) => {
    expect(service).toBeTruthy();
  }));

  it('should return login io error', inject([MemsourceService, MockBackend], (service: MemsourceService, backend: MockBackend) => {
    const response = new ResponseOptions({
      body: JSON.stringify(MOCK_LOGIN_IO_ERROR)
    });

    const baseResponse = new Response(response);

    const expectedUrl = 'http://localhost:8080/api/v1/log?name=&password=';

    backend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(expectedUrl);
        connection.mockRespond(baseResponse);
      }
    );

    return service.login('', '').subscribe(data => {
      expect(data).toEqual(MOCK_LOGIN_IO_ERROR);
    });
  }));

  it('should return login success', inject([MemsourceService, MockBackend], (service: MemsourceService, backend: MockBackend) => {
    const response = new ResponseOptions({
      body: JSON.stringify(MOCK_LOGIN_SUCCESS)
    });

    const baseResponse = new Response(response);

    const expectedUrl = 'http://localhost:8080/api/v1/log?name=aaa@bbb.ccc&password=ppp';

    backend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(expectedUrl);
        connection.mockRespond(baseResponse);
      }
    );

    return service.login('aaa@bbb.ccc', 'ppp').subscribe(data => {
      expect(data).toEqual(MOCK_LOGIN_SUCCESS);
    });
  }));

  it('should return projects', inject([MemsourceService, MockBackend], (service: MemsourceService, backend: MockBackend) => {
    const response = new ResponseOptions({
      body: JSON.stringify(MOCK_PROJECTS_RESPONSE)
    });

    const baseResponse = new Response(response);

    const expectedUrl = 'http://localhost:8080/api/v1/projects';

    backend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(expectedUrl);
        connection.mockRespond(baseResponse);
      }
    );

    return service.listProjects().subscribe(data => {
      expect(data).toEqual(MOCK_PROJECTS_RESPONSE);
    });
  }));

  class ResponseError extends Error {
    status: number;
  }

  it('should handle error properly', inject([MemsourceService, MockBackend], (service: MemsourceService, backend: MockBackend) => {
    const errorResponse = new ResponseError();
    errorResponse.status = 404;

    const expectedUrl = 'http://localhost:8080/api/v1/projects';

    backend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.method).toBe(RequestMethod.Get);
        expect(connection.request.url).toBe(expectedUrl);
        connection.mockError(errorResponse);
      }
    );

    return service.listProjects().subscribe(
      data => {
      },
      error => {
        expect(error).toBe('Error');
      }
    );
  }));
});
