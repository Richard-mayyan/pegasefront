"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { CommunityEntity } from "@/logic/domain/entities";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import RichDescription from "@/components/RichDescription";

export default function StudHomePage() {
  const [communities, setCommunities] = useState<CommunityEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get("/communities");
        setCommunities(res.data.data || []);
      } catch (e) {
        setError("Impossible de charger les communautés");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = communities.filter((c) =>
    (c.name || "").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <header className="py-8 text-center">
        <h1 className="text-3xl font-bold">Communauté Pegase</h1>
        <div className="mt-4 w-full max-w-md mx-auto flex gap-2">
          <Input
            placeholder="Chercher mentor ou communauté"
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
            {filtered.map((c, idx) => (
              <Link
                key={idx}
                href={`/stud/commu/${c.id}`}
                className="bg-white rounded-lg border p-3 hover:shadow-sm transition-shadow"
              >
                <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden">
                  <img
                    src={c.images?.[0]?.url || c.logo || "/placeholder.svg"}
                    alt={c.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-gray-900 truncate">
                    {c.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {/* {c.description || "Sans description"} */}
                    <RichDescription
                      description={c.description || "Sans description"}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
