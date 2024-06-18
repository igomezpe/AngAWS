import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path:"login", component:LoginComponent, title:"Login"
    },
    {
        path:"dashboard", component:DashboardComponent, title:"Login"
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    }
];
