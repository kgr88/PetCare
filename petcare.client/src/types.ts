export interface Animal {
  id: number;
  name: string;
  species: string;
  breed?: string;
  dateOfBirth?: string;
  microchipId?: string;
}

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
}
