import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [``],
})
export class AppComponent implements OnInit {



  public emailExists: boolean = false;

  loginForm:FormGroup = this.formBuilder.group({email1: [''], email2: [''], password1: [''], password2: ['']});


  public editMail!:boolean;
  public editPass!:boolean;



  constructor( private formBuilder: FormBuilder,
               private router: Router,) {
  }

  ngOnInit(): void {

      this.loginForm = this.formBuilder.group({
        email1: ['', {
          validators: [
            Validators.required,
          ],
          updateOn: 'change'
        }],
        email2: ['', {
          validators: [
            Validators.required,
          ],
          updateOn: 'change'
        }],
        password1: ['', {
          validators: [
            Validators.required,
          ],
          updateOn: 'change'
          /* change
             blur
             submit */
        }],
        password2: ['', {
          validators: [
            Validators.required,
          ],
          updateOn: 'change'
          /* change
             blur
             submit */
        }]
      }, {validators: this.matchPassword('email1', 'email2', 'password1', 'password2')});



  }

  get email1() {
    return this.loginForm.controls['email1'];
  }

  get email2() {
    return this.loginForm.controls['email1'];
  }

  get password1() {
    return this.loginForm.controls['password1'];
  }

  get password2() {
    return this.loginForm.controls['password2'];
  }

  // Сверяем два пароля на одинаковость
  public matchPassword(email1: any, email2: any, password1: any, password2: any): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {


      if (this.editMail) {
        let mailOne = control.get(email1)?.value;
        let mailTwo = control.get(email2)?.value;

        if (mailOne != mailTwo) {
          return { 'noMatchMail': true }
        }
      } else if (this.editPass) {
        let passwordOne = control.get(password1)?.value;
        let passwordTwo = control.get(password2)?.value;

        if (passwordOne != passwordTwo) {
          return { 'noMatchPass': true }
        }
      }



      return null;

    }
  }



  changeFieldMail() {
    this.emailExists = false
    this.editMail = true
    this.editPass = false
  }


  changeFieldPass() {
    this.editMail = false
    this.editPass = true
  }

}
