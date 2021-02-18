import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginParams } from '../auth.models';
import { auth } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  lock = false;

  constructor(private fb: FormBuilder, private router: Router, private af: AngularFireAuth) { }

  ngOnInit() {
    this.setupForm();
  }

  async signIn(credentials: LoginParams) {
    try {
      this.lock = true;
      const res = await this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
      if (res) { this.router.navigate(['/stats']); }
    } catch (error) { this.errorMessage = error.message; } finally { this.lock = false; }
  }

  async googleLogin() {
    try {
      this.lock = true;
      const res = await this.af.auth.signInWithPopup(new auth.GoogleAuthProvider());
      if (res) { this.router.navigate(['/stats']); }
    } catch (error) { this.errorMessage = error.message; } finally { this.lock = false; }
  }

  async facebookLogin() {
    try {
      this.lock = true;
      const res = await this.af.auth.signInWithPopup(new auth.FacebookAuthProvider());
      if (res) { this.router.navigate(['/stats']); }
    } catch (error) { this.errorMessage = error.message; } finally { this.lock = false; }
  }

  setupForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: ''
    });
  }

}
