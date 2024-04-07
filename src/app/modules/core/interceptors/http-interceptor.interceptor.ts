// loader.interceptor.ts

import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, timeout } from "rxjs/operators";
import { LoaderService } from "../services/loader.service";
@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const timeoutValue = 10000;
    this.loaderService.show();

    return next.handle(req).pipe(
      timeout(timeoutValue),
      catchError((error) => {
        // Handle errors (e.g., timeout error)
        // console.error("HTTP Request Error:", error);

        return throwError(error);
      }),
      finalize(() => this.loaderService.hide())
    );
  }
}
