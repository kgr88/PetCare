import { Button } from '@/components/ui/button';
import AnimalsList from './AnimalsList';
import type { Animal } from '@/types';

export default function Animals({ animals }: { animals: Animal[] }) {
  return (
    <>
      <div className="flex justify-between my-4">
        <h1 className="text-3xl font-bold">Your Pets</h1>
        <Button variant="outline">Add Animal</Button>
      </div>
      <AnimalsList animals={animals ?? []}></AnimalsList>
    </>
  );
}
