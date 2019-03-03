import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isEditing: boolean = false;
  response: any;
  inputName: string = '';
  inputId: string = '';
  inputDescription: string = '';
  //----Alerts-----
  inputLength: boolean = false;
  alert: boolean = false;
  empty: boolean = false;
  del: boolean = false;
  update: boolean = false;
  isInputIdNumber: boolean = false;
  //----End of Alerts-----
  public apps: Applications[];
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.http.get('http://localhost:8080/api/topics')
      .subscribe(response => {
        this.response = response;
        this.apps = response as Applications[];
        console.log(this.response);
      })
  }

  delete() {
    this.apps.splice(this.modalIndex, 1);
    this.http.delete('http://localhost:8080/api/topics/' + this.modalId).subscribe();
    this.clearInputBox();
    this.isEditing = false;
    this.showDeleteAlert();
  }

  modalId: any = '';
  modalName: any = '';
  modalDescription: any = '';
  modalIndex: any;

  askIfDelete(id: any, name: any, desc: any, index: number) {
    document.getElementById("openDeleteModal").click();
    this.modalId = id;
    this.modalName = name;
    this.modalDescription = desc;
    this.modalIndex = index;
  }


  put(id: any) {
    this.http.put('http://localhost:8080/api/topics/' + id, {
      id: this.inputId,
      name: this.inputName,
      description: this.inputDescription
    }).subscribe((data: any) => this.ngOnInit());
    this.stopEditing();
    this.showUpdateAlert();
  }

  post() {
    if (this.checkInputLength() || this.checkIfAlreadyExist() || this.checkIfNumber()) return;
    this.http.post('http://localhost:8080/api/topics', {
      id: this.inputId,
      name: this.inputName,
      description: this.inputDescription
    }).subscribe((data: any) => this.ngOnInit());
    this.showSuccessAlert();
    this.clearInputBox();

  }

  //--------- Input validation ----------
  checkIfAlreadyExist() {
    for (let i = 0; i < this.apps.length; i++) {
      if (this.apps[i].id == this.inputId) {
        this.modalId = this.apps[i].id;
        this.modalName = this.apps[i].name;
        this.modalDescription = this.apps[i].description;
        this.askIfUpdate();
        return true;
      }
    }
    return false;
  }

  askIfUpdate() {
    document.getElementById("openUpdateModal").click();
  }

  checkInputLength() {
    if (this.inputId.length > 150 || this.inputDescription.length > 150 || this.inputName.length > 150) {
      this.showTooLongInputAlert();
      return true;
    }
    if (this.inputId.length < 3) {
      this.showEmptyInputAlert();
      return true;
    }
  }

  checkIfNumber() {
    let count: number = 0;
    for (let i = 0; i < this.inputId.length; i++) {
      if (this.inputId.charAt(i) == '0' || this.inputId.charAt(i) == '1' || this.inputId.charAt(i) == '2' || this.inputId.charAt(i) == '3' ||
        this.inputId.charAt(i) == '4' || this.inputId.charAt(i) == '5' || this.inputId.charAt(i) == '6' || this.inputId.charAt(i) == '7' ||
        this.inputId.charAt(i) == '8' || this.inputId.charAt(i) == '9') {
        count++;
      }
    }
    if (count != this.inputId.length) {
      this.showNotNumberAlert();
      return true;
    }
  }
  //------ End of Input validation ------


  //------ Changes while editing records ------
  edit(id: any, index: number) {
    this.isEditing = true
    this.inputId = this.apps[index].id;
    this.inputName = this.apps[index].name;
    this.inputDescription = this.apps[index].description;
    this.editName();
  }


  stopEditing() {
    this.isEditing = false;
    this.clearInputBox();
  }

  @ViewChild("name") nameField: ElementRef;
  editName(): void {
    setTimeout(() => {
      this.nameField.nativeElement.focus();
    }, 0);
  }
  //------ End of Changes while editing records ------
  //------ ALERTS -------

  showSuccessAlert() {
    this.alert = true;
    setTimeout(() => this.alert = false, 2000);
  }

  showUpdateAlert() {
    this.update = true;
    setTimeout(() => this.update = false, 2000);
  }

  showTooLongInputAlert() {
    this.inputLength = true;
    setTimeout(() => this.inputLength = false, 2000);
  }

  showEmptyInputAlert() {
    this.empty = true;
    setTimeout(() => this.empty = false, 3000);
  }

  showDeleteAlert() {
    this.del = true;
    setTimeout(() => this.del = false, 2000);
  }

  showNotNumberAlert() {
    this.isInputIdNumber = true;
    setTimeout(() => this.isInputIdNumber = false, 3000);
  }

  //-----End of alerts-----

  clearInputBox() {
    this.inputId = '';
    this.inputName = '';
    this.inputDescription = '';
  }
}

interface Applications {
  id: string;
  name: string;
  description: string;
}
