import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ElectionComponent } from './components/election/election.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './utils/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home', canActivate: [AuthGuard],
    component: HomeComponent,
  },
  {
    path: 'election', canActivate: [AuthGuard],
    component: ElectionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
