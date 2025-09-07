"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Coach = {
  id: string;
  firstname: string;
  lastname: string;
  avatar?: string;
  description?: string;
};

export default function StudHomePage() {
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/coachs");
        setCoaches(res.data?.data || res.data || []);
      } catch (e) {
        setError("Impossible de charger les coachs");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = coaches.filter((c) =>
    `${c.firstname} ${c.lastname}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="py-8 text-center">
        <h1 className="text-3xl font-bold">Trouver un coach</h1>
        <div className="mt-4 w-full max-w-md mx-auto flex gap-2">
          <Input
            placeholder="Chercher un coach"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button>Rechercher</Button>
        </div>
      </header>

      {loading && (
        <div className="text-center py-10 text-gray-500">Chargement...</div>
      )}
      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      {!loading && !error && (
        <main className="max-w-6xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((c) => (
              <Link
                key={c.id}
                href={`/coach/${c.id}`}
                className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow"
              >
                <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={c.avatar || "/placeholder.svg"}
                    alt={`${c.firstname} ${c.lastname}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-gray-900 truncate">
                    {c.firstname} {c.lastname}
                  </div>
                  {c.description && (
                    <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {c.description}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
