import Link from "next/link";
import { Button } from "@/components/ui/Button";

const features = [
  {
    emoji: "📚",
    title: "Notes, PYQs & Study Material",
    description:
      "Download notes, previous year papers, assignments and practicals for your semester. Upload your own material for others — after admin approval.",
    href: "/notes",
    cta: "Browse study material",
  },
  {
    emoji: "🍜",
    title: "Food & Shops Around Campus",
    description:
      "Know what food stalls, cloud kitchens, cafes and stationery shops around college are selling — and at what price.",
    href: "/food",
    cta: "Explore around campus",
  },
  {
    emoji: "♻️",
    title: "Second-hand Products",
    description:
      "Students can list and buy second-hand books, electronics, cycles and more — right inside the campus community.",
    href: "/products",
    cta: "View products",
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              Built for students, by students
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              College life, made{" "}
              <span className="text-blue-600">easy</span>.
            </h1>
            <p className="mt-5 text-lg text-gray-600">
              Xcollege brings your study material, campus food spots and second-hand
              marketplace together — so you never have to run around for the basics.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get started — it&apos;s free
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Login
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              New here? Use the demo account shown on the login page.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-2xl">
                {feature.emoji}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
              <Link
                href={feature.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                {feature.cta}
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { value: "100+", label: "Study materials" },
              { value: "7+", label: "Food & shop spots" },
              { value: "8+", label: "Active listings" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
                <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
