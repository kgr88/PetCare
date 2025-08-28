import { useParams } from 'react-router-dom';
import AuthorizeView from '../../features/auth/AuthorizeView';
import Header from '@/features/animalDetails/components/Header';
import Medications from '@/features/medications/components/Medications';
import Appointments from '@/features/appointments/components/Appointments';
import { Separator } from '@radix-ui/react-separator';
import { useAnimals } from '@/features/animals/hooks/useAnimals';

export default function AnimalDetails() {
  const { id } = useParams();
  const animalId = Number(id);
  const { data: animal, error, isLoading } = useAnimals(true, animalId);
  const activeAnimal = Array.isArray(animal) ? animal[0] : animal;

  return (
    <AuthorizeView>
      {isLoading && <div className="p-6 text-center">Loading...</div>}
      {error && (
        <div className="p-6 text-center text-red-600">
          Error: {error?.message}
        </div>
      )}
      {animal && (
        <>
          <div className="w-full mx-auto">
            <div className="flex items-start">
              <div className=" flex-shrink-0 pr-6">
                <Header animal={activeAnimal} />
              </div>
              <Separator orientation="vertical" />
              <div className="flex-1 rounded-lg">
                <div className="grid grid-cols-2 gap-6">
                  <Medications singleAnimal={true} animalId={animalId} />
                  <Appointments
                    singleAnimal={true}
                    animalId={animalId}
                    animals={activeAnimal ? [activeAnimal] : []}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AuthorizeView>
  );
}
