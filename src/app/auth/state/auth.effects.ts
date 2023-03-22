import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppState } from "src/app/store/app.state";
import { setErrorMessage, setLoadingSpinner } from "src/app/store/shared/shared.actions";
import { autoLogin, autoLogout, loginStart, loginSuccess, signupStart, signupSuccess } from "./auth.actions";



@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions, 
    private authService: AuthService, 
    private store: Store<AppState>,
    private router:Router
    
    ) {

  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap(action => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }))
            const user = this.authService.formatUser(data);
            this.authService.setUserInLocalStorage(user);
            return loginSuccess({ user });
          }),
          catchError((errResp) => {
            const errorMessage = this.authService.getErrorMessage(errResp.error.error.message);
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });


  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess,signupSuccess]),
        tap((action)=> {
          this.store.dispatch(setErrorMessage({message:''}))
          this.router.navigate(['/']);
        })
      )
    },
    {dispatch: false}
  )



  signUp$ = createEffect(() => {
    return this.actions$.pipe(ofType(signupStart),exhaustMap(action => {
      return this.authService.signUp(action.email, action.password).pipe(map(data =>{
        this.store.dispatch(setLoadingSpinner({status:false}))
        const user = this.authService.formatUser(data);
        this.authService.setUserInLocalStorage(user);
        return signupSuccess({user})
      }),catchError((errResp) => {
        const errorMessage = this.authService.getErrorMessage(errResp.error.error.message);
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return of(setErrorMessage({ message: errorMessage }));
      })
      );
    }))
  })

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(ofType(autoLogin), mergeMap((action) => {
      const user = this.authService.getUserFromLocalStorage();
      return of(loginSuccess({user}))
    })
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(ofType(autoLogout), map((action) => {
      this.authService.logout(); 
      this.router.navigate(['auth'])
    }))
  }, {dispatch:false})

}