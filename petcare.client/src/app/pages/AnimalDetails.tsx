import { useParams } from 'react-router-dom';
import AuthorizeView from '../../features/auth/AuthorizeView';
import Header from '@/features/animalDetails/components/Header';
import Medications from '@/features/medications/components/Medications';
import Appointments from '@/features/appointments/components/Appointments';
import { Separator } from '@radix-ui/react-separator';
import { useAnimals } from '@/features/animals/hooks/useAnimals';
import WeightHistory from '@/features/weightLogs/components/WeightHistory';

export default function AnimalDetails() {
  const { id } = useParams();
  const animalId = Number(id);
  const { data: animal, error, isLoading } = useAnimals(true, animalId);
  const activeAnimal = Array.isArray(animal) ? animal[0] : animal;
  if (!animalId || !activeAnimal) return 'An unexpected error has occured';
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
            <div className="flex flex-col md:flex-row items-start">
              <div className="w-full md:w-auto flex-shrink-0 md:pr-6">
                <Header animal={activeAnimal} />
              </div>

              <div className="flex-1 rounded-lg w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Medications singleAnimal={true} animalId={animalId} />
                  </div>
                  <div>
                    <Appointments
                      singleAnimal={true}
                      animalId={animalId}
                      animals={activeAnimal ? [activeAnimal] : []}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <WeightHistory animalId={animalId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AuthorizeView>
  );
}
