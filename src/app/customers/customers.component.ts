import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://localhost:5001/api/customers",{
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    })
    .subscribe(data => {
      this.customers = data;
    }, err => {
      console.log(err);
    });
  }

}
