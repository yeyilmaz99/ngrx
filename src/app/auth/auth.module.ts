import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { LoginComponent } from "./login/login.component";
import { AuthEffects } from "./state/auth.effects";
import { SignupComponent } from './signup/signup.component';




const routes: Routes = [
    {
        path: '', children: [
            { path: '', pathMatch:"full", redirectTo: 'login', },
            {
                path: 'login', component: LoginComponent
            },
            {path: 'signup', component:SignupComponent}
        ]
    }
]


@NgModule({

    declarations: [LoginComponent, SignupComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        EffectsModule.forFeature([AuthEffects])
    ],

})

export class AuthModule {

}