import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http'


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  value = 'value';

  uri = 'https://api.sunrise-sunset.org/json?'

  posts: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }
  loginForm = new FormGroup({
    lat: new FormControl('', Validators.required),
    long: new FormControl('', Validators.required)
  })

  registerUser(form: NgForm) {
    this.value = form.value;

    this.http.get(this.uri + 'lat=' + form.value.lat + '&lng=' + form.value.long ).subscribe((response) => {
      this.posts = JSON.stringify(response)
      console.log(this.posts)
    })
  }

}
