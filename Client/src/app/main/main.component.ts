import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient,} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  isEditing: boolean = false;
  response: any;
  inputClient: string = '';
  inputId: string = '';
  inputContract: string = '';
  //----Alerts-----
  inputLength: boolean = false;
  alert: boolean = false;
  empty: boolean = false;
  del: boolean = false;
  update: boolean = false;
  isInputIdNumber: boolean = false;
  //----End of Alerts-----
  public apps: Applications[];
  constructor(private http: HttpClient, private router: Router) {
  
  }

  ngOnInit() {
    this.http.get('http://localhost:8080/contracts')
      .subscribe(response => {
        this.response = response;
        this.apps = response as Applications[];
      })
  }

  

  delete() {
    this.http.delete('http://localhost:8080/contracts/' + this.modalId).subscribe((data: any) => this.ngOnInit());
    this.clearInputBox();
    this.isEditing = false;
    this.showDeleteAlert();
  }

  modalId: any = '';
  modalClient: any = '';
  modalContract: any = '';
  modalIndex: any;

  askIfDelete(id: any, client: any, desc: any, index: number) {
    document.getElementById("openDeleteModal").click();
    this.modalId = id;
    this.modalClient = client;
    this.modalContract = desc;
    this.modalIndex = index;
  }


  put(id: any) {
    this.http.put('http://localhost:8080/contracts/' + id, {
      id: this.inputId,
      clientName: this.inputClient,
      contractType: this.inputContract
    }).subscribe((data: any) => this.ngOnInit());
    this.stopEditing();
    this.showUpdateAlert();
  }

  post() {
    if (this.checkInputLength() || this.checkIfAlreadyExist() || this.checkIfNumber()) return;
    this.http.post('http://localhost:8080/contracts', {
      id: this.inputId,
      clientName: this.inputClient,
      contractType: this.inputContract
    }).subscribe((data: any) => this.ngOnInit());
    this.showSuccessAlert();
    this.clearInputBox();

  }

  //--------- Input validation ----------
  checkIfAlreadyExist() {
    for (let i = 0; i < this.apps.length; i++) {
      if (this.apps[i].id == this.inputId) {
        this.modalId = this.apps[i].id;
        this.modalClient = this.apps[i].clientName;
        this.modalContract = this.apps[i].contractType;
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
    if (this.inputId.length > 150 || this.inputContract.length > 150 || this.inputClient.length > 150) {
      this.showTooLongInputAlert();
      return true;
    }
    if (this.inputId.length < 1) {
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
    this.inputClient = this.apps[index].clientName;
    this.inputContract = this.apps[index].contractType;
    this.editClient();
  }


  stopEditing() {
    this.isEditing = false;
    this.clearInputBox();
  }

  @ViewChild("client") clientField: ElementRef;
  editClient(): void {
    setTimeout(() => {
      this.clientField.nativeElement.focus();
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
    this.inputClient = '';
    this.inputContract = '';
  }

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
  }

  
}

interface Applications {
  id: string;
  clientName: string;
  contractType: string;
}

