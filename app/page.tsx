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
    <main className="flex min-h-screen flex-col gap-2 p-4">
      <h1>
        <strong>SVG to URL app</strong>: convert SVG string to data URL
      </h1>
      <div className="flex flex-grow flex-col gap-4 md:flex-row">
        <div className="relative flex flex-col md:w-1/2">
          <textarea
            className="block w-full flex-grow border bg-transparent"
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
          <p className="flex items-center justify-center text-wrap text-center md:w-1/2">
            processing...
          </p>
        ) : (
          input &&
          (error ? (
            <pre className="flex items-center justify-center text-wrap text-center text-red-600 md:w-1/2">
              {(error as Error).toString()}
            </pre>
          ) : (
            !!url && (
              <div className="flex flex-grow flex-col">
                <input
                  className="mb-4 w-full border bg-transparent"
                  readOnly
                  value={url}
                />
                <div className="relative min-h-40 items-center justify-center md:flex-grow">
                  <Image className="dark:invert" alt="preview" fill src={url} />
                </div>
              </div>
            )
          ))
        )}
      </div>
    </main>
  );
}
