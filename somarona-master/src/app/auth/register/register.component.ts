import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginParams } from '../auth.models';
import { auth } from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  lock = false;

  constructor(private fb: FormBuilder, private router: Router, private af: AngularFireAuth) { }

  ngOnInit() {
    this.setupForm();
  }

  async signUp(credentials: LoginParams) {
    try {
      this.lock = true;
      const res = await this.af.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
      if (res) {
        const loginRes = await this.af.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
        if (loginRes) { this.router.navigate(['/stats']); }
      }
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
    this.registerForm = this.fb.group({
      email: ['', Validators.email],
      password: ''
    });
  }
}
