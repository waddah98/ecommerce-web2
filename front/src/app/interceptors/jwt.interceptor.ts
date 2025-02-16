import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

export function intercept(
  req: HttpRequest<any>,
  next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const newReq = req.clone({
      //  headers: req.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
      setHeaders:{
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    })
  return next (newReq);
}
