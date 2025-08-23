export interface Animal {
  id: number;
  name: string;
  species: string;
  breed?: string;
  dateOfBirth?: string;
  microchipId?: string;
}

export type FormData = Omit<Animal, 'id'>;
