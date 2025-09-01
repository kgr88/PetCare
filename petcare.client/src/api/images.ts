export async function uploadPhoto(
  file: File,
  animalId: number
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`/api/images/${animalId}`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload photo. Please try again.');
  }

  return response.json();
}
