import { cn } from "@/utils";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "white" | "ghost";
  className?: string;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  fullWidth = false,
}: ButtonProps) {
  const baseStyles =
    "px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20",
    outline: "border-2 border-primary text-primary hover:bg-blue-50",
    white: "bg-white text-primary hover:bg-gray-50 shadow-md",
    ghost: "text-gray-600 hover:text-primary hover:bg-blue-50",
  };

  return (
    <button
      className={cn(
        `${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""}`,
        className
      )}
    >
      {children}
    </button>
  );
}
