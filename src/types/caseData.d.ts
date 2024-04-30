export interface CaseData {
  notes: string;
  skinCharacteristicsUrl: string;
  skinCharacteristics: SkinCharacteristics;
  createdDate: string;
  id: string;
  completionDate: string;
  chestPhotos: Photos;
  chestScan: string;
  updatedDate: number;
  formInfo: FormInfo;
  status: string;
  braPhotos: Photos;
  braScan: string;
  colorSwatchUrl: string;
  signatureUrl: string;
  reviewerId: string;
  step: string;
  dateOfBirth: string;
  patientInitials: string;
  holdForInsurance: boolean;
  companyName: string;
  accountNumber: string;
  username: string;
  dealer: string;
}

export interface SkinCharacteristics {
  tattoos: Tattoo[];
  skinColor: Color;
  areolaColor: Color;
  areolaSize: string;
  nippleProjection: string;
  areolaStyle: string;
}

export interface Color {
  name: string;
  hex: string;
}

export interface Tattoo {
  location: number[];
  rotation: number;
  size: string;
  type: Type;
  color: string;
}

export interface Type {
  name: string;
  defaultColor: string;
  imageName: string;
}
