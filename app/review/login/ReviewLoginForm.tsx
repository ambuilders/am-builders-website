"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function ReviewLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/review-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("That password is not correct.");
        setLoading(false);
        return;
      }

      const next = searchParams.get("next") || "/review";
      router.push(next);
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="login-wrap">
      <style jsx>{`
        .login-wrap {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #faf3ec;
          font-family: "Karla", Arial, sans-serif;
          padding: 20px;
        }
        .card {
          background: #ffffff;
          border: 1px solid #e7dfd5;
          border-radius: 10px;
          padding: 34px 30px;
          max-width: 360px;
          width: 100%;
        }
        .logo {
          font-family: "Fraunces", serif;
          font-weight: 600;
          font-size: 18px;
          color: #26282b;
          margin-bottom: 6px;
        }
        .logo span {
          color: #fc8eac;
        }
        h1 {
          font-size: 16px;
          color: #4b4d50;
          font-weight: 500;
          margin: 0 0 22px 0;
        }
        input {
          width: 100%;
          font-size: 15px;
          padding: 11px 12px;
          border: 1px solid #e7dfd5;
          border-radius: 7px;
          background: #faf3ec;
          margin-bottom: 14px;
        }
        input:focus {
          outline: none;
          border-color: #2f6e6a;
        }
        button {
          width: 100%;
          background: #fc8eac;
          color: #26282b;
          font-weight: 700;
          font-size: 14.5px;
          border: none;
          border-radius: 7px;
          padding: 12px;
          cursor: pointer;
        }
        button:disabled {
          opacity: 0.6;
          cursor: default;
        }
        .error {
          color: #e2597a;
          font-size: 13px;
          margin-top: 12px;
        }
      `}</style>

      <form className="card" onSubmit={handleSubmit}>
        <div className="logo">
          AM <span>BUILDERS</span>
        </div>
        <h1>Enter the password to leave a review</h1>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoFocus
        />
        <button type="submit" disabled={loading}>
          {loading ? "Checking…" : "Enter"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
