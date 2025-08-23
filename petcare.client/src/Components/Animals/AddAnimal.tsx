import { useState } from 'react';

interface AddAnimalProps {
  validateForm: (formData: any) => void;
}

export default function AddAnimal({ validateForm }: AddAnimalProps) {
  const [form, setForm] = useState({
    name: '',
    species: '',
    breed: '',
    dateOfBirth: '',
    microchipId: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    validateForm(form);
    console.log(JSON.stringify(form));
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Species:</label>
          <input
            name="species"
            value={form.species}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Breed:</label>
          <input
            name="breed"
            value={form.breed ?? ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth ?? ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Microchip ID:</label>
          <input
            name="microchipId"
            value={form.microchipId ?? ''}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Animal</button>
      </form>
    </>
  );
}
