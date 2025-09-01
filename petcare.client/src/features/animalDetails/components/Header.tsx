import type { Animal } from '../../../types';
import { PawPrint, Tag, Calendar, ScanBarcode } from 'lucide-react';
import UploadPhoto from './UploadPhoto';
import placeholderSrc from '../../../assets/placeholder-animal.jpg';

export default function Header({ animal }: { animal?: Animal }) {
  if (!animal) return null;
  return (
    <div className="flex flex-row md:flex-col items-start mb-4">
      <div>
        <img
          src={
            animal.imageUrl == '' || animal.imageUrl == null
              ? placeholderSrc
              : animal.imageUrl
          }
          alt="animal"
          className="w-40 h-40 lg:w-60 lg:h-60 rounded-md object-cover shadow-lg"
        />
        <UploadPhoto animalId={animal.id} />
      </div>
      <div className="ml-2 md:ml-0 md:mt-2">
        <h1 className="text-2xl font-semibold">{animal.name}</h1>

        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 flex flex-col gap-2">
          <div className="flex items-center">
            <PawPrint className="h-5 mr-1" />
            <span>Species: {animal.species}</span>
          </div>
          {animal.breed && (
            <div className="flex">
              <Tag className="h-5 mr-1" />
              Breed: {animal.breed}
            </div>
          )}
          {animal.dateOfBirth && (
            <div className="flex">
              <Calendar className="h-5 mr-1" /> Born: {animal.dateOfBirth}
            </div>
          )}
          {animal.microchipId && (
            <div className="flex">
              <ScanBarcode className="h-5 mr-1" /> Microchip:{' '}
              {animal.microchipId}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
