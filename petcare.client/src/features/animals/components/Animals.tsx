import AnimalsList from './AnimalsList';
import type { Animal } from '@/types';
import AddAnimal from './AddAnimal';

export default function Animals({ animals }: { animals: Animal[] }) {
  return (
    <>
      <div className="flex justify-between my-4">
        <h1 className="text-3xl font-bold">Your Pets</h1>
        <AddAnimal></AddAnimal>
      </div>
      <AnimalsList animals={animals ?? []}></AnimalsList>
    </>
  );
}
