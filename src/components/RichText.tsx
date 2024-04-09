//@ts-nocheck

"use client";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import {
  BLOCKS,
  MARKS,
  Document as RichTextDocument,
} from "@contentful/rich-text-types";
import { ReactNode, useEffect, useState } from "react";

type RichTextProps = {
  document: RichTextDocument | null;
};

function RichText({ document }: RichTextProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  if (!document) {
    return null;
  }

  const options = {
    renderMark: {
      [MARKS.BOLD]: (text: any) => (
        <strong className="font-bold">{text}</strong>
      ),
      [MARKS.CODE]: (node: any, _: any) => {
        return (
          <pre className="px-6 py-3 my-4 bg-gray-500 text-blue-300 font-mono rounded-lg">
            <code>{node}</code>
          </pre>
        );
      },
    },

    renderNode: {
      [BLOCKS.PARAGRAPH]: (_node: any, children: ReactNode) => (
        <p className="text-green-700">{children}</p>
      ),
    },
    renderText: (text: any) => text.replace("!", "?"),
  };

  return (
    <p className="text-black">{documentToReactComponents(document, options)}</p>
  );
}

export default RichText;
