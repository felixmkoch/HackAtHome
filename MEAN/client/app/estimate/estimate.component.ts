import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RealEstateProperties} from "../shared/models/realEstateProperties.model";
import {estimateResult, EstimateService} from "../services/estimate.service";

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
    { name: 'Eigentumswohnung', icon: 'apartment', disabled: false },
    { name: 'Haus (coming soon)', icon: 'home', disabled: true },
  ];

  booleanParameter = [
    { name: 'balconyOrTerrace', displayName: 'Balkon oder Terrasse', isSelected: false, icon: 'balcony' },
    { name: 'basement', displayName: 'Keller', isSelected: false, icon: 'home_repair_service' },
    { name: 'garden', displayName: 'Garten', isSelected: false, icon: 'yard' },
    { name: 'guestToilet', displayName: 'Gäste-WC', isSelected: false, icon: 'wc' },
    { name: 'kitchen', displayName: 'Einbauküche', isSelected: false, icon: 'countertops' },
    { name: 'lift', displayName: 'Aufzug', isSelected: false, icon: 'elevator' },
    { name: 'garage', displayName: 'Garage', isSelected: false, icon: 'garage' },
    { name: 'noStairAccess', displayName: 'Treppenloser Zugang', isSelected: false, icon: 'accessible' },
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

  estimatedPrice: number;
  loading: boolean;

  constructor(private _formBuilder: FormBuilder, private estimationService: EstimateService) {}

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
      garage: [false],
      noStairAccess: [false]
    });
  }


  getForm(): void {
    const allData: RealEstateProperties = {
      ...this.firstFormGroup.getRawValue(),
      ...this.secondFormGroup.getRawValue(),
      ...this.thirdFormGroup.getRawValue()
    }
    this.loading = true;
    this.estimationService.getEstimate(allData).subscribe((result: estimateResult) => {
      setTimeout(()=>{
        this.loading = false;
        this.estimatedPrice = result?.estimate;
        }, 1500)

      console.log('result: ', result)
    })
    console.log('allData: ', allData);
  }

  clickCard(card) {
    card.isSelected = !card.isSelected;
    this.thirdFormGroup.controls[card.name].setValue(card.isSelected);
  }
}
