import {type HttpHandlerFn, type HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, switchMap, throwError} from 'rxjs';
import {AuthService} from './auth.service';

let isRefreshing = false;

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authSevice = inject(AuthService)
  const token = inject(AuthService).token

  if (!token) return next(req)

  if (isRefreshing) {
    return refreshAndProcessed(authSevice, req,  next)
  }

  req = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })

  return next(addToken(req, token)).pipe(
    catchError(error => {
      if (error.status === 403) {
        return refreshAndProcessed(authSevice, req, next)
      }

      return throwError(error);
    })
  )
}

const refreshAndProcessed = (authSevice: AuthService, req: HttpRequest<any>, next: HttpHandlerFn) => {
  if (!isRefreshing) {
    isRefreshing = true;
    return authSevice.refreshAuthToken()
      .pipe(
        switchMap((res) => {
          isRefreshing = false;
          return next(addToken(req, res.access_token))
        })
      )
  }
  return next(addToken(req, authSevice.token!))

}

const addToken = (req: HttpRequest<any>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
}
