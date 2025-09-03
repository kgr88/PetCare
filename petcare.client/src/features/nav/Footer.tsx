import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="h-12 border-t-1 text-sm">
        <div className="flex justify-between max-w-6xl mx-auto items-center h-full px-4">
          <span className="font-bold">PetCare</span>
          <span>
            Made by{' '}
            <Link
              to="https://github.com/kgr88"
              className="text-blue-700 dark:text-blue-400 font-bold"
            >
              Krystian Gruszecki
            </Link>
          </span>
        </div>
      </footer>
    </>
  );
}
