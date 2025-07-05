
export interface School {
  name: string;
  inep: string;
}

export interface Classroom {
  id: string;
  outlets: number;
  tvs: number;
  hasInternet: boolean;
  chairs: number;
  studentCapacity: number;
  hasAirConditioning: boolean;
  fans: number;
}

export interface Technology {
  roboticsKits: number;
  chromebooks: number;
  notebooks: number;
  modems: number;
  printers: number;
  defectiveModems: number;
  hasSchoolInternet: boolean;
}

export interface SchoolCensusForm {
  selectedSchool: School | null;
  classroomsCount: number;
  classrooms: Classroom[];
  teachingModalities: string[];
  technology: Technology;
}

export interface SchoolCensusSubmission extends SchoolCensusForm {
  id: string;
  submittedAt: Date;
  submittedBy: string;
}
