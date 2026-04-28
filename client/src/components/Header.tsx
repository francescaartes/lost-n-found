import { ShieldAlert } from "lucide-react";

export default function Header() {
    return (
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 shrink-0">
            {/* Mobile */}
            <div className="md:hidden flex items-center gap-2 text-primary font-bold text-xl ">
                <ShieldAlert className="h-6 w-6" />
                <span>L&F</span>
            </div>
        </header>
    );
}
