export interface Animal {
  id: number;
  name: string;
  species: string;
  breed?: string;
  dateOfBirth?: string;
  microchipId?: string;
}

export type AnimalForm = Omit<Animal, 'id'>;

export type FormData = Omit<Animal, 'id'>;

export interface Medication {
  id: number;
  animalId: number;
  animalName: string;
  name: string;
  dosage: string;
  instructions: string;
  startDate: string;
  endDate: string;
  type: string;
  frequencyType: string;
  frequency: number;
  lastTaken: string;
}

export interface MedicationForm {
  animalId: number;
  name: string;
  dosage: string;
  instructions?: string;
  startDate: string;
  endDate: string;
  type: 'recurring' | 'as needed';
  frequencyType: 'days' | 'hours';
  frequency: number;
}

export interface MedicationLog {
  medicationId: number;
  timeTaken: string;
}

export interface Appointment {
  id: number;
  animalId: number;
  animalName: string;
  type: string;
  date: string;
  location: string;
}

export type AppointmentForm = Omit<Appointment, 'id' | 'animalName'>;

export interface WeightLog {
  id: number;
  animalId: number;
  weight: number;
  date: string;
}

export type WeightLogForm = Omit<WeightLog, 'id'>;
