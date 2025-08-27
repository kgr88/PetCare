import type { Appointment, AppointmentForm } from '@/types';

export async function getAppointments(): Promise<Appointment[]> {
  const res = await fetch('/api/appointments');
  if (!res.ok) {
    const error: Error & { status?: number } = new Error(
      'Failed to fetch appointments'
    );
    error.status = res.status;
    throw error;
  }
  return res.json();
}

export async function createAppointment(
  appointment: AppointmentForm
): Promise<AppointmentForm> {
  const res = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  });
  if (!res.ok) {
    const error: Error & { status?: number } = new Error(
      'Failed to schedule appointment'
    );
    error.status = res.status;
    throw error;
  }
  return res.json();
}
