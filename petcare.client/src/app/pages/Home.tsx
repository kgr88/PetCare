import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ArrowRight, House } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <section className="flex flex-col justify-center items-center h-[60vh] ">
        <div className="leading-8 text-center md:leading-10 max-w-full md:max-w-[60vw] lg:max-w-[40vw]">
          <h1 className="tracking-tight inline font-semibold text-[clamp(1rem,10vw,2rem)] sm:text-[clamp(1rem,10vw,3rem)] lg:text-5xl text-center">
            Keep track of details and information of&nbsp;
          </h1>
          <h1 className="tracking-tight inline font-semibold from-[#461cff] to-[#4b78f2] text-[clamp(1rem,10vw,2rem)] sm:text-[clamp(1rem,10vw,3rem)] lg:text-5xl bg-clip-text text-transparent bg-gradient-to-b text-center">
            all your pets.
          </h1>
        </div>
        <h2 className="w-full md:w-1/2 my-6 text-medium lg:text-large font-normal text-gray-800 dark:text-gray-400 block max-w-full text-center md:max-w-[60vw]">
          Pet Care is a web app that allows you to manage your pets, keep track
          of medications, appointments and weight history.
        </h2>
        <Button
          asChild
          className="w-full md:max-w-[60vw] lg:max-w-[40vw] text-md rounded-full h-10"
        >
          <Link to="/login-page">
            Get Started
            <ArrowRight />
          </Link>
        </Button>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 max-w-[60rem] mx-auto">
        <Card className="p-3">
          <CardHeader className="p-0 flex font-bold items-center gap-2">
            <House className="border-1 rounded-full p-1 text-red-300 bg-indigo-600 h-7 w-7" />{' '}
            Dashboard
          </CardHeader>
          <CardContent className="p-0 text-sm">
            See list of your pets, their medications and appointments in a clean
            dashboard with info about all your pets.
          </CardContent>
        </Card>
        <Card className="p-3">
          <CardHeader className="p-0 flex font-bold items-center gap-2">
            <House className="border-1 rounded-full p-1 text-red-300 bg-indigo-600 h-7 w-7" />{' '}
            Medications
          </CardHeader>
          <CardContent className="p-0 text-sm">
            Track your pets medications, including dosage, frequency and
            instructions. Add logs to never forget when was it last taken.
          </CardContent>
        </Card>
        <Card className="p-3">
          <CardHeader className="p-0 flex font-bold items-center gap-2">
            <House className="border-1 rounded-full p-1 text-red-300 bg-indigo-600 h-7 w-7" />{' '}
            Appointments
          </CardHeader>
          <CardContent className="p-0 text-sm">
            Save vet visits, grooming sessions, and training dates to never miss
            your appointment
          </CardContent>
        </Card>
        <Card className="p-3">
          <CardHeader className="p-0 flex font-bold items-center gap-2">
            <House className="border-1 rounded-full p-1 text-red-300 bg-indigo-600 h-7 w-7" />{' '}
            Weight Tracking
          </CardHeader>
          <CardContent className="p-0 text-sm">
            Record your pet's weight over time. Spotting small changes can help
            you catch health issues early.
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
