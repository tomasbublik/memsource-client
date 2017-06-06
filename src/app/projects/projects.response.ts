import {ProjectModel} from './project';
export class ProjectsResponse {
  projectModels: ProjectModel[];
  reason: string;
  success: string;
}
