import { Component, Type } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http'
import { getSafePropertyAccessString } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  uri = 'https://api.sunrise-sunset.org/json?'

  posts: any;

  constructor(private http: HttpClient) {
  }
  getPosts(){
    let lat = new HttpParams().set('lat', 'lat=36.7201600')
    let long = new HttpParams().set('long', '&lng=-4.4203400')


    this.http.get(this.uri).subscribe((response) => {
      this.posts = JSON.stringify(response)
      console.log(this.posts)
    })
  }
  

}
