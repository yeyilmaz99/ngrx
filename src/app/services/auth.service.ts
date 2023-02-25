import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../models/authResponseData.model";


@Injectable({
    providedIn:'root'
})

export class AuthService {
    constructor(private http:HttpClient){

    }

    login(email: string, password: string):Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
          { email, password, returnSecureToken: true }
        );
      }

}