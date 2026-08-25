import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return <IconBase {...props}><path d="M5 12h14M13 6l6 6-6 6" /></IconBase>;
}

export function PhoneIcon(props: IconProps) {
  return <IconBase {...props}><path d="M6.6 2.8l3 3.1-2 2.5c1.1 2.4 3 4.3 5.4 5.4l2.5-2 3.1 3c.7.7.7 1.8.1 2.6l-1.3 1.8c-.6.8-1.6 1.1-2.5.8C8.7 18.3 3.7 13.3 2 7.1c-.3-.9 0-1.9.8-2.5l1.8-1.4c.6-.5 1.4-.6 2-.4Z" /></IconBase>;
}

export function MailIcon(props: IconProps) {
  return <IconBase {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></IconBase>;
}

export function FacebookIcon(props: IconProps) {
  return <IconBase {...props}><path d="M14 8h3V4h-3c-3 0-5 2-5 5v2H6v4h3v6h4v-6h3l1-4h-4V9c0-.7.3-1 1-1Z" /></IconBase>;
}

export function HomeIcon(props: IconProps) {
  return <IconBase {...props}><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></IconBase>;
}

export function BuildingIcon(props: IconProps) {
  return <IconBase {...props}><path d="M4 21V4h11v17M15 9h5v12M8 8h3M8 12h3M8 16h3M18 13h.01M18 17h.01M2 21h20" /></IconBase>;
}

export function CheckIcon(props: IconProps) {
  return <IconBase {...props}><path d="m5 12 4 4L19 6" /></IconBase>;
}

export function BoltIcon(props: IconProps) {
  return <IconBase {...props}><path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z" /></IconBase>;
}

export function ShieldIcon(props: IconProps) {
  return <IconBase {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></IconBase>;
}

export function ToolsIcon(props: IconProps) {
  return <IconBase {...props}><path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L20 16.4a2.5 2.5 0 1 1-3.6 3.6l-7.7-7.7a4 4 0 0 0-5-5L6 9.6 3.6 12l-2.3-2.3a4 4 0 0 0 5 5" /></IconBase>;
}

export function LeafIcon(props: IconProps) {
  return <IconBase {...props}><path d="M20 4C10 4 4 9 4 17c5 1 11-1 16-13Z" /><path d="M4 20c3-5 7-8 12-11" /></IconBase>;
}
