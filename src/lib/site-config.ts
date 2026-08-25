export const siteConfig = {
  name: "Solara",
  title: "Solara | Reliable Solar Solutions in Cebu",
  description:
    "Solar design, installation, battery backup, maintenance, and net-metering assistance for homes and businesses across Cebu.",
  email: "solara.energy26@gmail.com",
  phones: [
    { display: "+63 947 312 6639", href: "tel:+639473126639" },
    { display: "+63 927 737 4892", href: "tel:+639277374892" },
  ],
  facebook: "https://www.facebook.com/profile.php?id=61593718622013",
  serviceArea: "Entire Cebu, Philippines",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
} as const;

export const navigation = [
  { label: "Solutions", href: "/#solutions" },
  { label: "System Types", href: "/#system-types" },
  { label: "Packages", href: "/#packages" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Why Solara", href: "/#why-solara" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

export const brandNames = [
  "Deye",
  "Canadian Solar",
  "JinkoSolar",
  "LONGi",
  "Sungrow",
  "Dyness",
  "GenixGreen",
  "Solis",
  "GoodWe",
  "CST Energy",
  "Alltopec",
  "LVTopsun",
  "SRNE",
  "Growatt",
  "AE Solar",
] as const;
