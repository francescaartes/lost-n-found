import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Home,
    PlusSquare,
    FileText,
    LogOut,
    MoreVertical,
    User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarContentProps {
    onNavigate?: () => void;
}

export default function SidebarContent({ onNavigate }: SidebarContentProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const navItems = [
        { path: "/", label: "Home", icon: Home },
        { path: "/report", label: "Report an Item", icon: PlusSquare },
        { path: "/my-reports", label: "My Reports", icon: FileText },
    ];

    const handleLogout = async () => {
        await logout();
        if (onNavigate) onNavigate();
        navigate("/login");
    };

    return (
        <div className="flex flex-col h-full">
            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onNavigate}
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

            {/* User Profile & Logout */}
            {user && (
                <div className="p-4 border-t border-border bg-card/50 mt-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center w-full gap-3 p-2 rounded-lg hover:bg-muted transition-colors text-left group outline-none">
                                <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shrink-0 shadow-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold truncate text-foreground">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground truncate">
                                        {user.email}
                                    </p>
                                </div>

                                <MoreVertical className="h-4 w-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                            </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end" className="w-56 mb-2">
                            {/* <DropdownMenuItem className="cursor-pointer">
                                <User className="mr-2 h-4 w-4" />
                                <span>View Profile</span>
                            </DropdownMenuItem> */}
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
        </div>
    );
}
