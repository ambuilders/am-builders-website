"use client";

import { useEffect, useRef, useState, type ChangeEvent, type ReactNode } from "react";
import { FileIcon, UploadIcon, XIcon } from "@/components/icons";
import { isAllowedFloorPlanFile, MAX_FLOOR_PLAN_FILE_SIZE_BYTES } from "@/lib/floor-plan/file-validation";
import type { CeilingHeightBand } from "@/lib/floor-plan/types";
import { cities } from "@/lib/site-config";

const CEILING_HEIGHT_OPTIONS: { value: CeilingHeightBand; label: string }[] = [
  { value: "under-7-6", label: "Under 7'6\"" },
  { value: "7-6-to-8", label: "7'6\" - 8'" },
  { value: "8-plus", label: "8'+" },
];

const CITY_OPTIONS = [...cities.map((city) => ({ value: city.slug, label: city.name })), { value: "other", label: "Other" }];

const fieldClassName =
  "mt-2 w-full rounded-lg border border-charcoal-200 bg-cream-50 px-4 py-3 text-charcoal-900 placeholder:text-charcoal-500 focus:border-clay-500 focus:outline-none focus:ring-2 focus:ring-clay-500";

function FieldLabel({ children }: { children: ReactNode }) {
  return <label className="block text-sm font-medium text-charcoal-800">{children}</label>;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileUploadField({
  file,
  error,
  onSelect,
  onRemove,
}: {
  file: File | null;
  error: string | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (selected) onSelect(selected);
    // Reset so choosing the same file again after removing it still fires onChange.
    event.target.value = "";
  }

  return (
    <div>
      <FieldLabel>Have a floor plan from your builder? Upload it here (optional)</FieldLabel>
      <p className="mt-1 text-xs text-charcoal-500">
        This helps us generate more accurate concepts based on your actual basement layout.
      </p>

      {file ? (
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-charcoal-200 bg-cream-50 px-4 py-3">
          <FileIcon className="h-6 w-6 shrink-0 text-clay-600" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-charcoal-900">{file.name}</p>
            <p className="text-xs text-charcoal-500">{formatFileSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove uploaded file"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-charcoal-400 transition hover:bg-cream-200 hover:text-charcoal-700"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-charcoal-300 bg-cream-50 px-4 py-4 text-sm font-medium text-charcoal-600 transition hover:border-clay-400 hover:text-clay-700"
        >
          <UploadIcon className="h-5 w-5" />
          Upload a photo, scan, or PDF (max 10MB)
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.heic,.heif,.pdf,image/jpeg,image/png,image/heic,image/heif,application/pdf"
        onChange={handleChange}
        className="hidden"
      />

      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function YesNoToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | null;
  onChange: (next: boolean) => void;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="mt-2 flex gap-2">
        {[
          { text: "Yes", val: true },
          { text: "No", val: false },
        ].map((option) => (
          <button
            key={option.text}
            type="button"
            onClick={() => onChange(option.val)}
            aria-pressed={value === option.val}
            className={`rounded-full border px-6 py-2 text-sm font-medium transition ${
              value === option.val
                ? "border-clay-600 bg-clay-600 text-cream-50"
                : "border-charcoal-200 text-charcoal-700 hover:border-clay-400 hover:text-clay-700"
            }`}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

function Stepper({
  label,
  value,
  onStep,
  min,
  max,
  step = 1,
  helperText,
}: {
  label: string;
  value: number;
  // Reports a signed step rather than a computed next value, so the parent
  // can apply it with functional setState — computing the next value here
  // from the `value` prop would read a stale closure on rapid clicks and
  // silently drop increments.
  onStep: (delta: number) => void;
  min: number;
  max: number;
  step?: number;
  helperText?: string;
}) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div className="mt-2 flex items-center gap-4">
        <button
          type="button"
          onClick={() => onStep(-step)}
          disabled={value <= min}
          aria-label={`Decrease ${label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-200 text-lg font-semibold text-charcoal-700 transition hover:border-clay-400 hover:text-clay-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          −
        </button>
        <span className="w-12 text-center text-lg font-semibold text-charcoal-900">{value}</span>
        <button
          type="button"
          onClick={() => onStep(step)}
          disabled={value >= max}
          aria-label={`Increase ${label}`}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal-200 text-lg font-semibold text-charcoal-700 transition hover:border-clay-400 hover:text-clay-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          +
        </button>
        {helperText && <span className="text-xs text-charcoal-500">{helperText}</span>}
      </div>
    </div>
  );
}

type SpecsState = {
  areaSqFt: string;
  hasWindows: boolean | null;
  windowCount: string;
  hasSideEntry: boolean | null;
  ceilingHeight: CeilingHeightBand | "";
  bedrooms: number;
  bathrooms: number;
  hasKitchen: boolean | null;
  hasWetBar: boolean | null;
  hasGamesRoom: boolean | null;
};

const INITIAL_SPECS: SpecsState = {
  areaSqFt: "",
  hasWindows: null,
  windowCount: "",
  hasSideEntry: null,
  ceilingHeight: "",
  bedrooms: 0,
  bathrooms: 0,
  hasKitchen: null,
  hasWetBar: null,
  hasGamesRoom: null,
};

function validateSpecs(specs: SpecsState): string | null {
  const area = Number(specs.areaSqFt);
  if (!specs.areaSqFt || !Number.isFinite(area) || area < 100 || area > 6000) {
    return "Enter a basement area between 100 and 6,000 sq ft.";
  }
  if (specs.hasWindows === null) return "Let us know whether the basement has windows.";
  if (specs.hasWindows) {
    const count = Number(specs.windowCount);
    if (!specs.windowCount || !Number.isFinite(count) || count < 1 || count > 15) {
      return "Enter how many windows the basement has.";
    }
  }
  if (specs.hasSideEntry === null) return "Let us know whether there's a side entry.";
  if (!specs.ceilingHeight) return "Select a ceiling height.";
  if (specs.hasKitchen === null) return "Let us know if you'd like a kitchenette.";
  if (specs.hasWetBar === null) return "Let us know if you'd like a wet bar.";
  if (specs.hasGamesRoom === null) return "Let us know if you'd like a games room.";
  return null;
}

type ModalStatus = "idle" | "submitting" | "success" | "error";

export function FloorPlanForm() {
  const [specs, setSpecs] = useState<SpecsState>(INITIAL_SPECS);
  const [specsError, setSpecsError] = useState<string | null>(null);
  const [floorPlanFile, setFloorPlanFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStatus, setModalStatus] = useState<ModalStatus>("idle");
  const [modalError, setModalError] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  function updateSpec<K extends keyof SpecsState>(key: K, value: SpecsState[K]) {
    setSpecs((prev) => ({ ...prev, [key]: value }));
  }

  function handleFileSelect(selected: File) {
    if (!isAllowedFloorPlanFile(selected)) {
      setFileError("Please upload a JPG, PNG, HEIC, or PDF file.");
      return;
    }
    if (selected.size > MAX_FLOOR_PLAN_FILE_SIZE_BYTES) {
      setFileError("That file is too large — please upload one under 10MB.");
      return;
    }
    setFileError(null);
    setFloorPlanFile(selected);
  }

  function handleFileRemove() {
    setFloorPlanFile(null);
    setFileError(null);
  }

  function stepSpec(key: "bedrooms" | "bathrooms", delta: number, min: number, max: number) {
    setSpecs((prev) => ({
      ...prev,
      [key]: Math.min(max, Math.max(min, Math.round((prev[key] + delta) * 10) / 10)),
    }));
  }

  function handleGenerateClick() {
    const error = validateSpecs(specs);
    if (error) {
      setSpecsError(error);
      return;
    }
    setSpecsError(null);
    setModalStatus("idle");
    setModalError(null);
    setModalOpen(true);
  }

  useEffect(() => {
    if (modalOpen) firstFieldRef.current?.focus();
  }, [modalOpen]);

  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && modalStatus !== "submitting") setModalOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, modalStatus]);

  async function handleModalSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setModalStatus("submitting");
    setModalError(null);

    // The modal's own <form> already collects name/phone/email/city/company
    // as native fields — the basement specs and the optional file are
    // appended onto that same FormData rather than sent as JSON, since a
    // File can only travel over multipart/form-data.
    const formData = new FormData(event.currentTarget);
    formData.set("areaSqFt", specs.areaSqFt);
    formData.set("hasWindows", String(specs.hasWindows));
    formData.set("windowCount", specs.hasWindows ? specs.windowCount : "0");
    formData.set("hasSideEntry", String(specs.hasSideEntry));
    formData.set("ceilingHeight", specs.ceilingHeight);
    formData.set("bedrooms", String(specs.bedrooms));
    formData.set("bathrooms", String(specs.bathrooms));
    formData.set("hasKitchen", String(specs.hasKitchen));
    formData.set("hasWetBar", String(specs.hasWetBar));
    formData.set("hasGamesRoom", String(specs.hasGamesRoom));
    if (floorPlanFile) formData.set("floorPlanFile", floorPlanFile);

    try {
      // No Content-Type header here — the browser sets
      // multipart/form-data with the correct boundary automatically.
      const response = await fetch("/api/floor-plan-lead", {
        method: "POST",
        body: formData,
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        setModalStatus("error");
        setModalError(result?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setModalStatus("success");
    } catch {
      setModalStatus("error");
      setModalError("Something went wrong. Please check your connection and try again.");
    }
  }

  return (
    <div>
      {specsError && (
        <p role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {specsError}
        </p>
      )}

      <div className="space-y-8">
        <FileUploadField
          file={floorPlanFile}
          error={fileError}
          onSelect={handleFileSelect}
          onRemove={handleFileRemove}
        />

        <div>
          <FieldLabel>Basement Area (sq ft)</FieldLabel>
          <input
            type="number"
            min={100}
            max={6000}
            inputMode="numeric"
            value={specs.areaSqFt}
            onChange={(event) => updateSpec("areaSqFt", event.target.value)}
            placeholder="e.g. 900"
            className={fieldClassName}
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <YesNoToggle label="Windows Present" value={specs.hasWindows} onChange={(v) => updateSpec("hasWindows", v)} />
          {specs.hasWindows && (
            <div>
              <FieldLabel>Number of Windows</FieldLabel>
              <input
                type="number"
                min={1}
                max={15}
                inputMode="numeric"
                value={specs.windowCount}
                onChange={(event) => updateSpec("windowCount", event.target.value)}
                placeholder="e.g. 3"
                className={fieldClassName}
              />
            </div>
          )}
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <YesNoToggle label="Side Entry" value={specs.hasSideEntry} onChange={(v) => updateSpec("hasSideEntry", v)} />
          <div>
            <FieldLabel>Basement Ceiling Height</FieldLabel>
            <select
              value={specs.ceilingHeight}
              onChange={(event) => updateSpec("ceilingHeight", event.target.value as CeilingHeightBand)}
              className={fieldClassName}
            >
              <option value="">Select a height</option>
              {CEILING_HEIGHT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <Stepper
            label="Bedrooms"
            value={specs.bedrooms}
            onStep={(delta) => stepSpec("bedrooms", delta, 0, 4)}
            min={0}
            max={4}
          />
          <Stepper
            label="Bathrooms"
            value={specs.bathrooms}
            onStep={(delta) => stepSpec("bathrooms", delta, 0, 2)}
            min={0}
            max={2}
            step={0.5}
            helperText="half-bath increments"
          />
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          <YesNoToggle label="Kitchen / Kitchenette" value={specs.hasKitchen} onChange={(v) => updateSpec("hasKitchen", v)} />
          <YesNoToggle label="Wet Bar" value={specs.hasWetBar} onChange={(v) => updateSpec("hasWetBar", v)} />
          <YesNoToggle label="Games Room" value={specs.hasGamesRoom} onChange={(v) => updateSpec("hasGamesRoom", v)} />
        </div>

        <button
          type="button"
          onClick={handleGenerateClick}
          className="inline-flex w-full items-center justify-center rounded-full bg-clay-600 px-8 py-4 text-base font-semibold text-cream-50 shadow-sm transition hover:bg-clay-700 sm:w-auto"
        >
          Generate Floor Plan Now
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close"
            onClick={() => modalStatus !== "submitting" && setModalOpen(false)}
            className="absolute inset-0 bg-charcoal-900/60"
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="floor-plan-modal-title"
            className="relative w-full max-w-md rounded-2xl bg-cream-50 p-8 shadow-xl"
          >
            {modalStatus === "success" ? (
              <div className="text-center">
                <p id="floor-plan-modal-title" className="font-serif text-2xl text-charcoal-900">
                  Check your email!
                </p>
                <p className="mt-3 text-charcoal-600">
                  Your concept floor plans are on the way — they&apos;ll land in your inbox shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setModalOpen(false);
                    setSpecs(INITIAL_SPECS);
                    setFloorPlanFile(null);
                    setFileError(null);
                  }}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-clay-600 px-6 py-2.5 text-sm font-semibold text-cream-50 transition hover:bg-clay-700"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} className="space-y-5">
                <div className="flex items-start justify-between">
                  <h2 id="floor-plan-modal-title" className="font-serif text-2xl text-charcoal-900">
                    Where should we send your floor plans?
                  </h2>
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    aria-label="Close"
                    className="text-charcoal-400 hover:text-charcoal-700"
                  >
                    ✕
                  </button>
                </div>

                {/* Honeypot — hidden from real users and screen readers, catches basic bots. */}
                <div
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", top: 0, width: 1, height: 1, overflow: "hidden" }}
                >
                  <label htmlFor="fp-company">Leave this field blank</label>
                  <input id="fp-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                <div>
                  <label htmlFor="fp-name" className="block text-sm font-medium text-charcoal-800">
                    Name
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="fp-name"
                    name="name"
                    required
                    autoComplete="name"
                    className={fieldClassName}
                  />
                </div>

                <div>
                  <label htmlFor="fp-phone" className="block text-sm font-medium text-charcoal-800">
                    Phone
                  </label>
                  <input id="fp-phone" name="phone" type="tel" required autoComplete="tel" className={fieldClassName} />
                </div>

                <div>
                  <label htmlFor="fp-city" className="block text-sm font-medium text-charcoal-800">
                    City
                  </label>
                  <select id="fp-city" name="city" required defaultValue="" className={fieldClassName}>
                    <option value="" disabled>
                      Select your city
                    </option>
                    {CITY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="fp-email" className="block text-sm font-medium text-charcoal-800">
                    Email
                  </label>
                  <input
                    id="fp-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={fieldClassName}
                  />
                </div>

                {modalStatus === "error" && modalError && (
                  <p role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {modalError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={modalStatus === "submitting"}
                  className="w-full rounded-full bg-clay-600 px-8 py-3.5 text-base font-semibold text-cream-50 transition hover:bg-clay-700 disabled:opacity-60"
                >
                  {modalStatus === "submitting" ? "Sending..." : "Send My Floor Plans"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
