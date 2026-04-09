import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "primary", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variant === "primary" && "bg-accent hover:bg-accent-light text-white shadow-lg shadow-accent/20 hover:shadow-accent/30",
        variant === "ghost" && "hover:bg-white/5 text-gray-300 hover:text-white",
        variant === "danger" && "bg-red-600 hover:bg-red-500 text-white",
        variant === "outline" && "border border-white/10 hover:border-white/20 text-gray-300 hover:text-white hover:bg-white/5",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-7 py-3.5 text-base",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
