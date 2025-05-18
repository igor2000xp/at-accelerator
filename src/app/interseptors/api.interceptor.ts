// This interceptor adds the API URL to all outgoing HTTP requests
import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

export const ApiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  // Clone the request to add the new URL
  const apiUrl = environment.apiUrl;
  let apiReq: HttpRequest<any> = req;

  // Check if the request URL already contains the API URL
  if (!req.url.startsWith('http://') && !req.url.startsWith('https://')) {
    apiReq = req.clone({
      url: `${apiUrl}${req.url}`,
    });
  }
  return next(apiReq);
};
