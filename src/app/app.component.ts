import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  response: any;
  inputName: string;
  inputId: string;
  inputDescription: string;
  public apps: Applications[];
  constructor(private http: HttpClient) {

  }

  delete(id: any, index: number){
    this.apps.splice(index, 1);
    this.http.delete('http://localhost:8080/api/topics/'+id).subscribe();
    
  }

  post(){
    this.http.post('http://localhost:8080/api/topics', {
      id: this.inputId,
      name: this.inputName,
      description: this.inputDescription
    }).subscribe((data:any)=>this.ngOnInit());
  }




  ngOnInit() {
    this.http.get('http://localhost:8080/api/topics')
    .subscribe(response => {
      this.response=response;
      this.apps = response as Applications[];
      console.log(this.response);
    })
  }
  
}
interface Applications {
    id: string;
    name: string;
    description: string;
  }