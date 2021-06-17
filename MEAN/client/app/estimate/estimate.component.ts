import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EstimateComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  pkmns = [
    { name: "bulbasaur", number: 1 },
    { name: "charmander", number: 4 }
  ];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      propertyType: ['test', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }

  onClick(event) {
    console.log(event);
    //this.firstFormGroup.controls['propertyType'].setValue('test');
  }

  getForm(): void {
    console.log(this.firstFormGroup);
    console.log(this.secondFormGroup);
  }
}
