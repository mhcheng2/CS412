import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginForm = new FormGroup({
    lat: new FormControl('', Validators.required),
    long: new FormControl('', Validators.required)
  })

  ngOnInit(): void {
    
  }

  get lat(){return this.loginForm.get('lat')}

  onClickSubmit(form: NgForm) {
    console.log(form.value);
    // {email: '...', password: '...'}
    // ... <-- now use JSON.stringify() to convert form values to json.
  }
}
