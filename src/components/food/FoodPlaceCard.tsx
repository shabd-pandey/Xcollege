import type { FoodPlace } from "@/types";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatPrice } from "@/utils/format";

export function FoodPlaceCard({ place }: { place: FoodPlace }) {
  return (
    <Card className="flex h-full flex-col p-5">
      <div className="flex items-start justify-between">
        <h3 className="text-base font-semibold text-gray-900">{place.name}</h3>
        {place.isPopular && <Badge variant="blue">Popular</Badge>}
      </div>
      <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
        <span className="flex items-center gap-0.5 font-medium text-amber-600">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.367-2.448a1 1 0 00-1.175 0l-3.367 2.448c-.783.57-1.838-.197-1.538-1.118l1.286-3.957a1 1 0 00-.363-1.118L2.062 9.385c-.783-.57-.381-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.287-3.958z" />
          </svg>
          {place.rating}
        </span>
        <span>·</span>
        <span>{place.distanceKm} km from campus</span>
      </div>
      <p className="mt-2 line-clamp-2 flex-1 text-sm text-gray-500">{place.description}</p>

      <div className="mt-3 rounded-lg bg-gray-50 p-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Prices
        </p>
        <ul className="mt-2 space-y-1.5">
          {place.menu.slice(0, 4).map((item) => (
            <li key={item.name} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{item.name}</span>
              <span className="font-medium text-gray-900">{formatPrice(item.price)}</span>
            </li>
          ))}
        </ul>
        {place.menu.length > 4 && (
          <p className="mt-1.5 text-xs text-gray-400">+ {place.menu.length - 4} more items</p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
        <span>
          {place.opensAt} – {place.closesAt}
        </span>
        <div className="flex flex-wrap justify-end gap-1">
          {place.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="gray">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}
