import { cn } from "@/utils";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  mobile?: boolean;
  className?: string;
}

export default function NavLink({
  href,
  children,
  mobile = false,
  className = "",
}: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        `
      font-medium hover:text-primary transition-colors
      ${
        mobile
          ? "block py-3 text-lg border-b border-gray-100 text-gray-800"
          : "text-gray-600 text-sm sm:text-lg"
      }
    `,
        className
      )}
    >
      {children}
    </a>
  );
}
