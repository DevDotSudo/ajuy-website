import type { SVGProps } from "react";

function IconBase({ children, ...props }: SVGProps<SVGSVGElement>) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>;
}

export const MenuIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="M4 7h16M4 12h16M4 17h16" /></IconBase>;
export const CloseIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="m6 6 12 12M18 6 6 18" /></IconBase>;
export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="M5 12h14M13 6l6 6-6 6" /></IconBase>;
export const SearchIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></IconBase>;
export const PhoneIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="M7 3h3l2 5-2 2a16 16 0 0 0 4 4l2-2 5 2v3a3 3 0 0 1-3 3C10 20 4 14 4 6a3 3 0 0 1 3-3Z" /></IconBase>;
export const MailIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></IconBase>;
export const MapIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z" /><path d="M9 3v15M15 6v15" /></IconBase>;
export const PeopleIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><circle cx="9" cy="8" r="3" /><path d="M3 20c0-4 2-7 6-7s6 3 6 7" /><path d="M16 5a3 3 0 0 1 0 6M17 13c3 0 4 3 4 6" /></IconBase>;
export const ChartIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></IconBase>;
export const SparkIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5Z" /><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7Z" /></IconBase>;
export const ShieldIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="M12 3 4 6v5c0 5 3 8 8 10 5-2 8-5 8-10V6Z" /><path d="m9 12 2 2 4-4" /></IconBase>;
export const BuildingIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="M4 21V8l8-5 8 5v13M2 21h20M8 21v-6h8v6M8 10h.01M12 10h.01M16 10h.01" /></IconBase>;
export const ImageIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="9" cy="10" r="2" /><path d="m21 15-5-5L5 20" /></IconBase>;
export const SendIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></IconBase>;
export const DownloadIcon = (props: SVGProps<SVGSVGElement>) => <IconBase {...props}><path d="M12 3v12M7 10l5 5 5-5M4 21h16" /></IconBase>;
