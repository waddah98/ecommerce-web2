import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { ProductsComponent } from './admin/products/products.component';
import { CategoriesComponent } from './admin/categories/categories.component';

export const routes: Routes = [
    {path:'', component: AuthComponent},
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},

                        /** ADMIN */ 
    {path:'admin/home',component: HomeAdminComponent},
    {path:'admin/products',component: ProductsComponent},
    {path:'admin/categories',component: CategoriesComponent},

                        /** CUSTOMER */
    // {path:'customer/home',component: CategoriesComponent},
];
