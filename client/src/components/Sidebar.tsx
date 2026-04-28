import { Link, useLocation } from "react-router-dom";
import {
    Home,
    PlusSquare,
    FileText,
    Bookmark,
    ShieldAlert,
} from "lucide-react";

export default function Sidebar() {
    const location = useLocation();

    const navItems = [
        { path: "/", label: "Home", icon: Home },
        { path: "/report", label: "Report an Item", icon: PlusSquare },
        { path: "/my-reports", label: "My Reports", icon: FileText },
        { path: "/saved", label: "Saved Items", icon: Bookmark },
    ];

    return (
        <aside className="w-64 h-screen bg-background border-r border-border hidden md:flex flex-col shrink-0">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-border">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-primary font-bold text-lg"
                >
                    <ShieldAlert className="h-6 w-6" />
                    <span>Lost & Found</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                            <Icon className="h-5 w-5 shrink-0" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
