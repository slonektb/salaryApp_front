import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-a',
  templateUrl: './a.component.html',
  styleUrls: ['./a.component.scss']
})
export class AComponent implements OnInit {

  survey: FormGroup = new FormGroup({});
  myForm: FormGroup = new FormGroup({})
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.myForm = this.fb.group({
      people: this.fb.array([this.createPeopleArray()])
    })
  }

  createPeopleArray() {
    return this.fb.group({
      name: null,
      addresses: new FormArray([
        this.createAddressArray()
      ])
    });
  }

  getPeople(form: FormGroup) {
    return form.controls['people'];
  }

  getAddress(form: any) {
    return form.controls.addresses.controls;
  }

  createAddressArray() {
    return this.fb.group({
      houseNo: null,
      city: null
    })
  }

  addPeople() {
    const control = this.myForm.get('people') as FormArray;
    control.push(this.createPeopleArray());
  }

  addAddress(i: string | number) {
    const control = (this.myForm.get('people')?.get('addresses')) as FormArray;
    // console.log(control);
    control.push(this.createAddressArray());
  }

  submit() {
    console.log(this.myForm.value)
  }

}
