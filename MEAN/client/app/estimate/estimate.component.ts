import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RealEstateProperties} from "../shared/models/realEstateProperties.model";

export type FlatType =
  | 'Dachgeschoss'
  | 'Etagenwohnung'
  | 'Penthouse'
  | 'Erdgeschosswohnung'
  | 'Maisonette'
  | 'Sonstige'
  | 'Hochparterre'
  | 'Souterrain';

@Component({
  selector: 'app-estimate',
  templateUrl: './estimate.component.html',
  styleUrls: ['./estimate.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EstimateComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  propertyTypes = [
    { name: 'Haus', icon: 'home' },
    { name: 'Eigentumswohnung', icon: 'apartment' },
  ];

  booleanParameter = [
    { name: 'balconyOrTerrace', displayName: 'Balkon oder Terrasse', isSelected: false, icon: 'home' },
    { name: 'basement', displayName: 'Keller', isSelected: false, icon: 'home' },
    { name: 'garden', displayName: 'Garten', isSelected: false, icon: 'home' },
    { name: 'guestToilet', displayName: 'Gäste-WC', isSelected: false, icon: 'home' },
    { name: 'kitchen', displayName: 'Einbauküche', isSelected: false, icon: 'home' },
    { name: 'lift', displayName: 'Aufzug', isSelected: false, icon: 'home' },
    { name: 'noStairAccess', displayName: 'Treppenloser Zugang', isSelected: false, icon: 'home' },
  ];

  allTypes: FlatType[] = [
    'Dachgeschoss',
    'Etagenwohnung',
    'Penthouse',
    'Erdgeschosswohnung',
    'Maisonette',
    'Sonstige',
    'Hochparterre',
    'Souterrain',
  ];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      propertyType: ['test', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      size: [50],
      rooms: [4],
      bathrooms: [null],
      bedrooms: [null],
      level: [null],
      garagePlaces: [null],
      type: [''],
    });
    this.thirdFormGroup = this._formBuilder.group({
      balconyOrTerrace: [false],
      basement: [false],
      garden: [false],
      guestToilet: [false],
      kitchen: [false],
      lift: [false],
      noStairAccess: [false]
    });
  }


  getForm(): void {
    const allData: RealEstateProperties = {
      ...this.firstFormGroup.getRawValue(),
      ...this.secondFormGroup.getRawValue(),
      ...this.thirdFormGroup.getRawValue()
    }
    console.log('allData: ', allData);
  }

  clickCard(card) {
    card.isSelected = !card.isSelected;
    this.thirdFormGroup.controls[card.name].setValue(card.isSelected);
  }
}
