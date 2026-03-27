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
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Navtični tečaji Izola</p>
        </div>

        <form action={formAction} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-5">
          {state?.error && (
            <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3">
              {state.error}
            </div>
          )}

          <label className="block">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Uporabniško ime</span>
            <input
              type="text"
              name="username"
              required
              className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Geslo</span>
            <input
              type="password"
              name="password"
              required
              className="mt-1 w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <button
            type="submit"
            disabled={pending}
            className="w-full py-2.5 bg-navy text-white rounded-lg font-medium text-sm hover:bg-navy-light transition-colors disabled:opacity-50"
          >
            {pending ? "Prijavljam..." : "Prijava"}
          </button>
        </form>
      </div>
    </div>
  );
}
