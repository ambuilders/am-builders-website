"use client";

import { useEffect, useRef, useState } from "react";

type AddressAutocompleteProps = {
  id: string;
  value: string;
  onSelect: (value: string) => void;
};

const fieldClassName =
  "mt-2 w-full rounded-lg border border-charcoal-200 bg-cream-50 px-4 py-3 text-charcoal-900 placeholder:text-charcoal-500 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500";

// Requires picking an actual suggestion from the dropdown rather than
// accepting free-typed text — onSelect("") is called on every keystroke
// that diverges from the last confirmed pick, so the parent's required-field
// check can't be satisfied by typing alone. Suggestions come from
// /api/geocode (OpenStreetMap Nominatim, no API key needed).
export function AddressAutocomplete({ id, value, onSelect }: AddressAutocompleteProps) {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<{ label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (query.trim().length < 3 || query === value) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    const timer = window.setTimeout(async () => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      setLoading(true);
      try {
        const response = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        const data = await response.json();
        setSuggestions(data.results ?? []);
        setOpen(true);
      } catch {
        // Aborted by a newer keystroke, or a network error — either way
        // just leave the suggestion list as-is.
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [query, value]);

  function handleChange(newValue: string) {
    setQuery(newValue);
    if (newValue !== value) onSelect("");
  }

  function handlePick(label: string) {
    setQuery(label);
    onSelect(label);
    setSuggestions([]);
    setOpen(false);
  }

  const showNoResults = open && !loading && suggestions.length === 0 && query.trim().length >= 3 && query !== value;

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        value={query}
        onChange={(event) => handleChange(event.target.value)}
        onFocus={() => suggestions.length > 0 && setOpen(true)}
        onBlur={() => window.setTimeout(() => setOpen(false), 150)}
        className={fieldClassName}
        placeholder="Start typing your address..."
        autoComplete="off"
        required
      />
      {loading && <p className="mt-1 text-xs text-charcoal-500">Searching...</p>}
      {open && suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 max-h-56 w-full overflow-y-auto rounded-lg border border-charcoal-200 bg-cream-50 shadow-lg">
          {suggestions.map((suggestion) => (
            <li key={suggestion.label}>
              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handlePick(suggestion.label)}
                className="block w-full px-4 py-2.5 text-left text-sm text-charcoal-800 hover:bg-clay-50"
              >
                {suggestion.label}
              </button>
            </li>
          ))}
        </ul>
      )}
      {showNoResults && <p className="mt-1 text-xs text-charcoal-500">No matches found — try a different search.</p>}
    </div>
  );
}
