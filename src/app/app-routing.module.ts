import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProjectsComponent} from './projects/projects.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'projects', component: ProjectsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
