"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { apiClient } from "@/logic/infra/repos/nodeapi/axios";
import { toast } from "sonner";

interface NotesTestProps {
  lessonId: number;
}

export default function NotesTest({ lessonId }: NotesTestProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);

  const testGetNotes = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get(`/lessons/${lessonId}/note`);
      console.log("API Response:", response);
      setNotes(response.data?.data || response.data || []);
      toast.success(`Récupéré ${notes.length} notes`);
    } catch (error) {
      console.error("Erreur API:", error);
      toast.error("Erreur lors de la récupération des notes");
    } finally {
      setIsLoading(false);
    }
  };

  const testCreateNote = async () => {
    setIsLoading(true);
    try {
      const testContent = JSON.stringify([
        {
          type: "paragraph",
          content: "Note de test créée le " + new Date().toLocaleString(),
        },
      ]);

      const response = await apiClient.post(`/lessons/${lessonId}/note`, {
        content: testContent,
      });

      console.log("Note créée:", response);
      toast.success("Note de test créée avec succès");

      // Recharger les notes
      await testGetNotes();
    } catch (error) {
      console.error("Erreur création:", error);
      toast.error("Erreur lors de la création de la note");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
      <h4 className="font-semibold mb-3">Test API Notes</h4>

      <div className="text-xs">
        <p>
          <strong>Lesson ID:</strong> {lessonId}
        </p>
        <p>
          <strong>Notes trouvées:</strong> {notes.length}
        </p>
        {notes.length > 0 && (
          <div className="mt-2">
            <p>
              <strong>Dernière note:</strong>
            </p>
            <pre className="bg-white p-2 rounded text-xs overflow-auto">
              {JSON.stringify(notes[0], null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
