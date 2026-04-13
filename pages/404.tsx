import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page not found</p>
        <Link href="/" className="mt-8 inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
          Go Home
        </Link>
      </div>
    </div>
  );
}
