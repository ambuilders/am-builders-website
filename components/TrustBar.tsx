import { Container } from "./Container";
import { BadgeCheckIcon, HomeIcon, MapPinIcon, ShieldCheckIcon } from "./icons";

const badges = [
  { icon: ShieldCheckIcon, label: "Licensed & Insured" },
  // Must match the Warranty Centre exactly: 1-year workmanship, 5-year
  // structural/waterproofing. An unqualified "5 Years Warranty" overstates
  // what the certificate actually covers.
  { icon: BadgeCheckIcon, label: "1-Yr Workmanship + 5-Yr Structural" },
  { icon: MapPinIcon, label: "Serving Calgary & Surrounding Areas" },
  { icon: HomeIcon, label: "Locally Owned & Operated" },
];

export function TrustBar() {
  return (
    <section className="border-y border-charcoal-100 bg-cream-100">
      <Container className="grid grid-cols-2 gap-8 py-10 text-center sm:grid-cols-4">
        {badges.map(({ icon: Icon, label }) => (
          <div key={label} className="flex flex-col items-center gap-3">
            <Icon className="h-7 w-7 text-clay-600" />
            <p className="text-sm font-medium text-charcoal-700">{label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}
