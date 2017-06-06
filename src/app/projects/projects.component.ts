import {Component, OnInit} from '@angular/core';
import {MemsourceService} from '../memsource.service';
import {ProjectsResponse} from './projects.response';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectsResponse: ProjectsResponse;
  errorMessage: string;

  constructor(private memsourceService: MemsourceService) {
  }

  ngOnInit() {
    this.memsourceService
      .listProjects()
      .subscribe(projectsResponse => this.projectsResponse = projectsResponse,
        error => this.errorMessage = <any>error);
  }

}
