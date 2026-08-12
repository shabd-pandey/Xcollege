export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <p className="text-lg font-semibold text-gray-900">Xcollege</p>
            <p className="mt-1 text-sm text-gray-500">
              Everything a college student needs, at your fingertips.
            </p>
          </div>
          <div className="flex gap-8 text-sm text-gray-500">
            <div>
              <p className="mb-2 font-semibold text-gray-700">Study</p>
              <ul className="space-y-1">
                <li>Notes</li>
                <li>Previous Year Papers</li>
                <li>Assignments</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold text-gray-700">Around Campus</p>
              <ul className="space-y-1">
                <li>Food & Shops</li>
                <li>Second-hand Products</li>
              </ul>
            </div>
            <div>
              <p className="mb-2 font-semibold text-gray-700">Account</p>
              <ul className="space-y-1">
                <li>Login</li>
                <li>Register</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Xcollege. Prototype build.
        </div>
      </div>
    </footer>
  );
}
