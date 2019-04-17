import { Routes } from '@angular/router'
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    { path: 'main', component: MainComponent,canActivate:[AuthGuard] },
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    { path : '**', redirectTo:'/login', pathMatch : 'full'}
    
];