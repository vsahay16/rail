import { ReactNode } from "react";

export function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    ticket: <><path d="M5 6.5h14v11H5z"/><path d="M8 6.5v11M16 6.5v11M10.5 10h3M10.5 14h3"/></>,
    pulse: <path d="M3 12h4l2-5 4 10 2-5h6"/>,
    route: <><circle cx="6" cy="17" r="2.5"/><circle cx="18" cy="7" r="2.5"/><path d="M8.5 17c5 0 1-10 7-10"/></>,
    calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01"/></>,
    clock: <><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></>,
    refund: <><path d="M7 7h9a4 4 0 010 8H8"/><path d="M10 4L7 7l3 3M10 11h4M10 14h4M10 17h3"/></>,
    seat: <><path d="M7 4v9h9V8a3 3 0 00-3-3H9M5 13h14v4H5zM7 17v3M17 17v3"/></>,
    chart: <><path d="M6 3h9l3 3v15H6z"/><path d="M15 3v4h4M9 11h6M9 15h6"/></>,
    arrow: <path d="M5 12h14M14 7l5 5-5 5"/>,
    chevron: <path d="M8 10l4 4 4-4"/>,
    shield: <><path d="M12 3l7 3v5c0 4.5-2.8 8-7 10-4.2-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/></>,
    sparkle: <><path d="M12 3l1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2z"/><path d="M18 14l.7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7z"/></>,
    swap: <path d="M7 7h11l-3-3M17 17H6l3 3"/>,
    bell: <path d="M6 16h12l-1.5-2v-4.5a4.5 4.5 0 00-9 0V14zM10 19h4"/>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/></>,
    close: <path d="M6 6l12 12M18 6L6 18"/>,
    menu: <path d="M4 7h16M4 12h16M4 17h16"/>,
    external: <><path d="M14 5h5v5"/><path d="M19 5l-8 8"/><path d="M18 13v5H6V6h5"/></>,
    train: <><rect x="5" y="3" width="14" height="15" rx="3"/><path d="M8 7h8M8 12h.01M16 12h.01M8 18l-2 3M16 18l2 3M8 21h8"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1116 0z"/><circle cx="12" cy="10" r="2.5"/></>,
    check: <path d="M5 12l4 4L19 6"/>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/></>,
  };
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name] ?? paths.sparkle}</svg>;
}
