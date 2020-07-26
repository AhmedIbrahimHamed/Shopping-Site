import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkuTgKf_muF8x4_NtHz1Gp2V-9mKsAD2w",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorRes => {
        return this.handleError(errorRes);
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAkuTgKf_muF8x4_NtHz1Gp2V-9mKsAD2w",
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorRes => {
        return this.handleError(errorRes);
      }));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = "An Unknown error occurred!";

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    } else {
      switch (errorRes.error.error.message) {
        case "EMAIL_NOT_FOUND":
          errorMessage = "This email doesn't exist !";
          break;
        case "INVALID_PASSWORD":
          errorMessage = "Invalid password !"
          break;
        case "EMAIL_EXISTS":
          errorMessage = "This email already exists !";
          break;
      }
      return throwError(errorMessage);
    }

  }

}