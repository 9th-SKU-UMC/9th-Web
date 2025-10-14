import clsx from "clsx";

const AuthInputStyle = clsx(
                    "w-full h-10 rounded-md px-3 text-sm outline-none",
                    "bg-zinc-900 text-white placeholder-white/50",
                    "border",
                    "focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500",
                    "transition"
                )

const AuthErrorMessageStyle = "mt-1 block text-xs text-red-500";

export { AuthInputStyle, AuthErrorMessageStyle };