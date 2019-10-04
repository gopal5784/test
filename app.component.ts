import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm, FormArray, FormControl } from '@angular/forms';  
import  {numberValidator, passwordValidator } from './validator'
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  users:any;
  regiForm: FormGroup;  
  Name:string='';  
  Email:string='';
  Password: string='';
  cpassword: string=''; 
  Gender:string=''; 
  DOB:Date=null;
  Country:string='';  
  Number:string='';
  url:any;
  maxDate = new Date(); //Max Date for DOB
 
  constructor(private fb: FormBuilder,private client: HttpClient) { 
    

this.regiForm = fb.group({  
      'Name' : [null, [Validators.required, Validators.maxLength(20)]],  
      'Email':[null, Validators.compose([Validators.required,Validators.email])],
      'Password':[null, [Validators.required, Validators.minLength(6)]],
      'cpassword': [null, [Validators.required, passwordValidator]],
      'Gender':[null, Validators.required],
      'DOB' : [null, Validators.required],
      'Country':[null, Validators.required],
      'Number':[null, [Validators.required, numberValidator, Validators.maxLength(10)]],  
    });

  this.regiForm.controls.Password.valueChanges
    .subscribe(
      x => this.regiForm.controls.cpassword.updateValueAndValidity()
    )}


    onFormSubmit(regiForm)  
    { 
      
       let passdata = {
         'firstName':regiForm.Name,
         'lastName':regiForm.Name,
         'email':regiForm.Email,
         'password':regiForm.Password,
         'gender':regiForm.Gender,
         'hobby':'Test',
         'country':regiForm.Country,
         'phone':regiForm.Number,
         'birthDate':regiForm.DOB
       }
  this.client
        .put('http://192.168.1.28:3001/api/query/Demo',passdata)
        .subscribe(res => console.log('add',res));
   }

    checkResponse(){
      this.client.get('http://192.168.1.28:3001/api/query/Demo')
      .subscribe(res => console.log('Get', res));
     }

  }
 
  // Profile Image 
  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.url = event.target.result;
  //     }
  //   }
  // }

  // Checkbox
  // ngOnInit() {

  //   this.regiForm = this.fb.group({
  //     interests: this.fb.array([])
  //   });


  //   setTimeout((res) => {
  //     this.interests = ["interest1", "interest2", "interest3"];
  //   });

  // }

  // onChange(event) {
  //   const interests = this.regiForm.get('interests') as FormArray;

  //   if(event.checked) {
  //     interests.push(new FormControl(event.source.value))
  //   } else {
  //     const i = interests.controls.findIndex(x => x.value === event.source.value);
  //     interests.removeAt(i);
  //   }
  // }
  
