interface BreastFormInfo {
  styleNumber: string;
  manufacturer: string;
  size: string;
}

interface Bilateral {
  coverage: string;
  movableTissue: boolean;
  side: string;
}

interface Unilateral {
  coverage: string;
  movableTissue: boolean;
  side: string;
}

interface BreastMeasurements {
  right: number;
  left: number;
  top: number;
  bottom: number;
}

interface ProstheticInfo {
  bilateralSideToMimic: string;
  bilateralLeftBreastInfo: Bilateral;
  bilateralLeftBreastFormInfo: BreastFormInfo;
  bilateralRightBreastFormInfo: BreastFormInfo;
  bilateralRightBreastInfo: Bilateral;
  wornInPocket: boolean;
  showingInCleavage: boolean;
  breastMeasurements: BreastMeasurements;
  profile: string;
  showingUnderArm: boolean;
  unilateralBreastInfo: Unilateral;
  unilateralBreastFormInfo: BreastFormInfo;
  mode: string;
  bilateralBreastFormInfo: BreastFormInfo;
}

interface BraInfo {
  size: string;
  styleNumber: string;
  manufacturer: string;
}

export interface FormData {
  prostheticInfo: ProstheticInfo;
  braInfo: BraInfo;
  fitterName: string;
  patientInfo: {
    insurance: string;
    dateOfBirth: string;
    initials: string;
  };
  po: string;
}
