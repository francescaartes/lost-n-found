import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 shrink-0">
            <Link to="/">
                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <ShieldAlert className="h-6 w-6" />
                    <span>Lost & Found</span>
                </div>
            </Link>

            {/* {user && (
                <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                    {user.name.charAt(0).toUpperCase()}
                </div>
            )} */}
        </header>
    );
}
