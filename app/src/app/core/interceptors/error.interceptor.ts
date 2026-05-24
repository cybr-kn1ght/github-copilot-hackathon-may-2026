import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error: ${error.error.message}`;
      } else if (error.status === 404) {
        errorMessage = 'GitHub user not found';
      } else if (error.status === 403) {
        errorMessage = 'GitHub API rate limit exceeded. Please try again later.';
      } else if (error.status === 0) {
        errorMessage = 'Network error. Please check your connection.';
      } else {
        errorMessage = `Error: ${error.status} ${error.statusText}`;
      }

      console.error(errorMessage, error);
      return throwError(() => new Error(errorMessage));
    })
  );
};
