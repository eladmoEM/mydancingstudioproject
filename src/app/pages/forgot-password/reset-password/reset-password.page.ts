import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  password: string = '';
  token: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
  }
  

  resetPassword() {
    this.http.post('http://localhost:3000/api/reset-password', { password: this.password, token: this.token }).subscribe(
      response => console.log(response),
      err => console.error(err)
    );
  }
}
