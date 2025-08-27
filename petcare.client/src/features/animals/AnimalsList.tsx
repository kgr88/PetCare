import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

import { useAnimals } from './hooks/useAnimals';
import dogSrc from '../../assets/dog.jpg';
export default function AnimalsList() {
  const { data: animals, error, isLoading } = useAnimals();
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {animals?.map((animal) => (
        <Link
          key={animal.id}
          to={`/animals/${animal.id}`}
          aria-label={`View ${animal.name}`}
          className="w-full"
        >
          <Card
            key={animal.id}
            className="w-full flex flex-col max-h-64 overflow-hidden p-0 gap-0 min-h-0"
          >
            <div className="w-full overflow-hidden min-h-0 rounded-lg">
              <img
                src={dogSrc}
                alt="Dog"
                className="w-full h-full object-cover object-center"
              />
            </div>

            <div className=" w-full p-2">
              <CardContent className="p-0">
                <p className="font-semibold">{animal.name}</p>
                <p className="text-sm text-muted-foreground">
                  {animal.species}
                  {animal.breed ? ', ' + animal.breed : ''}
                </p>
              </CardContent>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
