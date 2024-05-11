"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [input, setInput] = useState("");
  const [url, setURL] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!input) return;
    (async () => {
      setLoading(true);
      try {
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: input }),
        });
        if (!response.ok) {
          const error = new Error(await response.text());
          if (response.status === 400) error.name = "Invalid Input";
          throw error;
        }
        setError(null);
        const result = await response.text();
        setURL(result);
        navigator?.clipboard?.writeText(result);
        alert("Data URL copied to clipboard!");
      } catch (error) {
        setError(error as Error);
      }
      setLoading(false);
    })();
  }, [input]);

  return (
    <main className="flex min-h-screen flex-col gap-4 p-4">
      <div className="relative">
        <h1 className="mb-2">
          <strong>SVG to URL app</strong>: convert SVG string to data URL
        </h1>
        <textarea
          className="block w-full border bg-transparent"
          placeholder="<svg>...</svg>"
          disabled={loading}
          value={input}
          onChange={(e) => {
            setInput(e.target.value.trim());
          }}
        />
        <button
          className="absolute bottom-2 right-2 border"
          onClick={() => {
            setInput("");
          }}
        >
          clear
        </button>
      </div>
      {loading ? (
        <p className="text-center">processing...</p>
      ) : (
        input &&
        (error ? (
          <pre className="text-wrap text-center text-red-600">
            {(error as Error).toString()}
          </pre>
        ) : (
          !!url && (
            <div>
              <p>Result:</p>
              <input
                className="mb-4 w-full border bg-transparent"
                readOnly
                value={url}
              />
              <div className="relative min-h-40">
                <Image className="dark:invert" alt="preview" fill src={url} />
              </div>
            </div>
          )
        ))
      )}
    </main>
  );
}
