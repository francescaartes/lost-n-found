import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from "react";
import api from "@/lib/api";
import { Loader2, UndoDot } from "lucide-react";

interface User {
    _id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (userData: User) => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await api.get("/auth/me");
                setUser(res.data.user);
            } catch (err) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = (userData: User) => setUser(userData);

    const logout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
        } catch (err) {
            console.error("Logout failed", err);
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-screen">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />

                <div className="flex items-center gap-2 text-primary font-bold text-xl">
                    <UndoDot className="h-6 w-6 stroke-[2.5px]" />
                    <span className="sm:inline-block">TraceBack</span>
                </div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
