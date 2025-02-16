import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { ProductsComponent } from './admin/products/products.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { AddCategoryComponent } from './admin/categories/add-category/add-category.component';
import { AddProductComponent } from './admin/products/add-product/add-product.component';
import { ClientComponent } from './client/client.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthGuardLoggedIn } from './guards/auth-guard-logged-in.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
    {
      path:'',
      component: AuthComponent,
      canActivate:[AuthGuard]

    },
    {path:'login',
      component: AuthComponent,
      canActivate:[AuthGuard]

    },
    {
      path:'signup',
      component: AuthComponent,
      canActivate:[AuthGuard]
    },

                        /** ADMIN */
    {
      path:'admin/home',
      component: HomeAdminComponent,
      canActivate:[AuthGuardLoggedIn, RoleGuard],
      data: {role: 'admin'}
    },
    {
      path:'admin/products',
      component: ProductsComponent,
      canActivate:[AuthGuardLoggedIn, RoleGuard],
      data: {role: 'admin'}
    },

    {
      path:'admin/categories',
      component: CategoriesComponent,
      canActivate:[AuthGuardLoggedIn, RoleGuard],
      data: {role: 'admin'}
    },
    {
      path:'admin/categories/add',
      component: AddCategoryComponent,
      canActivate:[AuthGuardLoggedIn, RoleGuard],
      data: {role: 'admin'}

    },
    {
      path:'admin/products/add',
      component: AddProductComponent,
      canActivate:[AuthGuardLoggedIn, RoleGuard],
      data: {role: 'admin'}

    },

                        /** CLIENT */
    {
      path:'client/home',
      component: ClientComponent,
      canActivate:[AuthGuardLoggedIn]
    },
];
