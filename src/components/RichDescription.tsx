import { useCreateBlockNote } from "@blocknote/react";
import { fr as frLocale } from "@blocknote/core/locales";
import React from "react";
import { BlockNoteView } from "@blocknote/shadcn";

type Props = {
  description: string;
};

function RichDescription({ description }: Props) {
  const editor = useCreateBlockNote({
    dictionary: frLocale,
    initialContent: (() => {
      try {
        return description ? JSON.parse(description) : undefined;
      } catch (error) {
        return undefined;
      }
    })(),
  });
  return (
    <div className="prose prose-sm max-w-none text-gray-700">
      <div className="prose max-w-none">
        <BlockNoteView editor={editor} theme="light" editable={false} />
      </div>
    </div>
  );
}

export default RichDescription;
