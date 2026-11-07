import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useIsMobile } from "../lib/useIsMobile";

interface ResponsiveProps {
  desktop: ReactNode;
  // Omit when the page has no mobile layout. Mobile then goes home.
  mobile?: ReactNode;
}

export default function Responsive({ desktop, mobile }: ResponsiveProps) {
  const isMobile = useIsMobile();
  if (!isMobile) return desktop;
  return mobile ?? <Navigate to="/" replace />;
}
