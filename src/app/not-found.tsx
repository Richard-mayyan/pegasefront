import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="text-center max-w-md">
        <div className="text-7xl font-extrabold text-gray-200">404</div>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">
          Page introuvable
        </h1>
        <p className="mt-2 text-gray-600">
          Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-lg bg-customBg text-white hover:bg-customBg-hover transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
