"use client";

import { adminLogin } from "@/lib/actions";
import { useActionState } from "react";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(
    async (_prev: { error?: string } | undefined, formData: FormData) => {
      return await adminLogin(formData);
    },
    undefined
  );

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <form action={formAction} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold text-center">Admin prijava</h1>

        {state?.error && (
          <p className="text-red-600 text-center text-sm">{state.error}</p>
        )}

        <label className="block">
          <span className="text-sm font-medium">Uporabniško ime</span>
          <input
            type="text"
            name="username"
            required
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-btn-blue"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Geslo</span>
          <input
            type="password"
            name="password"
            required
            className="mt-1 w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-btn-blue"
          />
        </label>

        <button
          type="submit"
          disabled={pending}
          className="w-full py-2 bg-navy text-white rounded font-semibold hover:bg-navy-light transition-colors disabled:opacity-50"
        >
          {pending ? "Prijavljam..." : "Prijava"}
        </button>
      </form>
    </div>
  );
}
