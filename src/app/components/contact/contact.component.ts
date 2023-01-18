import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/contact.service';
import { DialogComponent } from '../dialog/dialog.component';
import { ContactModel } from '../../models/contact';
import Swal from 'sweetalert2';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MY_DATE_FORMATS} from '../../resources/my-date-formats';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { MomentDateAdapter } from '@angular/material-moment-adapter';
const moment =  _moment;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ]
})
export class ContactComponent implements OnInit {

  contact: ContactModel;
  formContact!: FormGroup;
  itemSelect:any;
  selectedStates:any;
  error:any;
  myControl = new FormControl('');
  date = new FormControl(moment());

  
  constructor(private fb: FormBuilder,private matDialog:MatDialog, private _contactService:ContactService) 
  {
    this.contact = new ContactModel();
    
    this.selectedStates = this.itemSelect;
    this.formContact = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Email: ['', [Validators.required, Validators.email]],
      Telephone: ['', [Validators.required, Validators.min(7)]],
      Date: ['', Validators.required],
      Item: ['', Validators.required]
    });
  }
 
  ngOnInit(): void {
    this.GetDivisions();
  }
  
  GetDivisions() {
  
    
    this._contactService.GetCityState()
      .subscribe(
        (resp:any) => {
         
          this.itemSelect = resp;
          console.log(this.itemSelect);
        }, (err) => {
          this.error = err;
        })
  }

  get NameNotValid() {
    return this.formContact?.get('Name')?.invalid && this.formContact?.get('Name')?.touched
  }

  get EmailNotValid() {
    return this.formContact?.get('Email')?.invalid && this.formContact?.get('Email')?.touched
  }

	get TelephoneNotValid() {
    return this.formContact?.get('Telephone')?.invalid && this.formContact?.get('Telephone')?.touched
  }

  get DateNotValid()
  {
    return this.formContact?.get('Date')?.invalid && this.formContact?.get('Date')?.touched
  }
  get CityAndStateNotValid()
  {
    return this.formContact?.get('Item')?.invalid && this.formContact?.get('Item')?.touched
  }

  saveContact()
  {
    if (this.formContact.valid) {
      this.getData();
      this._contactService.SendMessage(this.contact)
      .subscribe((data:any) =>{
        this.resetForms();
        
          Swal.fire(
            'Creado!',
              'Contacto creado exitosamente.',
              'success'
          )
      });
    }
    else{
     let dialogRef = this.matDialog.open(DialogComponent,
      {
        // data:10
      });

    }
  }

  private getData() {
    debugger;
      this.contact.name = this.formContact?.get('Name')?.value;
      this.contact.email = this.formContact?.get('Email')?.value;
      this.contact.date = this.formContact?.get('Date')?.value;
      this.contact.telephone = this.formContact?.get('Telephone')?.value;
      this.contact.CityAndState = this.formContact?.get('Item')?.value;
    }

  resetForms() {
    this.formContact?.reset();
    
  }

  onKey(search:string) { 
    if(search.length > 2)
    {
      this.selectedStates = this.search(search);
    }else
    {
      this.selectedStates = [];
    }
  }
    
    search(value:string) { 
      
      var result = this.itemSelect.filter((option: any) => option.name.toLowerCase().includes(value.toLowerCase()));
      return result;
    }

}
