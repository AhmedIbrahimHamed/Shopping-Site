import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string; 
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: "root"})
export class AuthService {
  
  constructor(private http: HttpClient) {}
  
  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkuTgKf_muF8x4_NtHz1Gp2V-9mKsAD2w",
    {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }
}