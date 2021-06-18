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
  calculatorFormGroup: FormGroup;

  propertyTypes = [
    { name: 'Eigentumswohnung', icon: 'apartment', disabled: false },
    { name: 'Haus (coming soon)', icon: 'home', disabled: true },
  ];

  booleanParameter = [
    { name: 'balconyOrTerrace', displayName: 'Balkon oder Terrasse', isSelected: false, icon: 'balcony' },
    { name: 'basement', displayName: 'Keller', isSelected: false, icon: 'home_repair_service' },
    { name: 'garden', displayName: 'Garten', isSelected: false, icon: 'yard' },
    { name: 'guestToilet', displayName: 'Gäste-WC', isSelected: false, icon: 'wc' },
    { name: 'lift', displayName: 'Aufzug', isSelected: false, icon: 'elevator' },
    { name: 'noStairAccess', displayName: 'Treppenloser Zugang', isSelected: false, icon: 'accessible' },
  ];

  allTypes: FlatType[] = [
    'Dachgeschoss',
    'Etagenwohnung',
    'Erdgeschosswohnung',
    'Hochparterre',
    'Maisonette',
    'Penthouse',
    'Souterrain',
    'Sonstige',
  ];

  estimatedPrice: number;
  loading: boolean;

  constructor(private _formBuilder: FormBuilder, private estimationService: EstimateService) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      propertyType: ['', Validators.required],
      zipCode: [''],
    });
    this.secondFormGroup = this._formBuilder.group({
      size: [70],
      rooms: [2.5],
      garagePlaces: [null],
    });
    this.thirdFormGroup = this._formBuilder.group({
      balconyOrTerrace: [false],
      basement: [false],
      garden: [false],
      guestToilet: [false],
      lift: [false],
      noStairAccess: [false]
    });
    this.calculatorFormGroup = this._formBuilder.group({
      price: [0, Validators.required],
      zip: ['', Validators.required],
      own_capital: [0, Validators.required],
    })
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
        const zip = this.firstFormGroup.controls['zipCode'].value;
        this.calculatorFormGroup.controls['zip'].setValue(zip || '81677');
        if (this.estimatedPrice) this.estimatedPrice = Math.round(this.estimatedPrice / 100) *100
        this.calculatorFormGroup.controls['own_capital'].setValue(this.estimatedPrice / 10);
        this.calculatorFormGroup.controls['price'].setValue(this.estimatedPrice);
        //this.calculatorFormGroup.updateValueAndValidity();
        }, 1)

      console.log('result: ', result)
    })
    console.log('allData: ', allData);
  }


  openInterhyp(): void {
    if (this.calculatorFormGroup.valid) {
      const price = this.calculatorFormGroup.controls['price'].value;
      const zip = this.calculatorFormGroup.controls['zip'].value;
      const ownCapital = this.calculatorFormGroup.controls['own_capital'].value;
      const link = `https://www.interhyp.de/zins-check#/vorbefuellter-rechner;ventureReason=KaufGeneral;priceBuilding=${price};equityValue=${ownCapital};zipVenture=${zip};requestResults=true;`
      window.open(link, '_blank');
    }
  }

  openImmoscout(): void {
    const size = this.secondFormGroup.controls['size'].value;
    const rooms = this.secondFormGroup.controls['rooms'].value;
    const baseUrl = `https://www.immobilienscout24.de/Suche/de/bayern/muenchen/wohnung-kaufen?numberofrooms=${rooms}-${rooms}&livingspace=${size-10}-${size+10}&enteredFrom=result_list`
    window.open(baseUrl, '_blank');
  }

  clickCard(card) {
    card.isSelected = !card.isSelected;
    this.thirdFormGroup.controls[card.name].setValue(card.isSelected);
  }
}
