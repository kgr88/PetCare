import type { Animal } from '../../../types';
import dogSrc from '../../../assets/dog.jpg';

export default function Header({ animal }: { animal?: Animal }) {
  if (!animal) return null;
  return (
    <div className="flex flex-col items-start">
      <img
        src={dogSrc}
        alt="animal"
        className="w-40 h-40 rounded-md object-cover shadow-lg"
      />
      <div className="mt-4">
        <h1 className="text-2xl font-semibold">{animal.name}</h1>

        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          <div>{animal.species}</div>
          {animal.breed ? <div>{animal.breed}</div> : null}
          {animal.dateOfBirth ? <div>Born: {animal.dateOfBirth}</div> : null}
          {animal.microchipId ? (
            <div>Microchip: {animal.microchipId}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
