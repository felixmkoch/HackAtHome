import {FlatType} from "../../estimate/estimate.component";

export class RealEstateProperties {
  propertyTypes: 'Haus' | 'Eigentumswohnung';
  type: FlatType;
  area: number;
  balconyOrTerrace: boolean;
  basement: boolean;
  baths: number;
  bedrooms: number;
  cost: number;
  level: number;
  garage: number;
  garden: boolean;
  guest_toilet: boolean;
  kitchen: boolean;
  lift: boolean;
  no_stairs_access: boolean;
}
