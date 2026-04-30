import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";

import { UndoDot, Loader2 } from "lucide-react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const res = await api.post("/auth/login", { email, password });
            login(res.data.user);
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Invalid credentials.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-full w-full flex items-center justify-center p-4 bg-background">
            <Card className="w-full max-w-lg shadow-lg border-border bg-card">
                <CardHeader className="space-y-1 flex flex-col items-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-2">
                        <UndoDot className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Welcome back
                    </CardTitle>
                    <CardDescription>
                        Login with your TraceBack account
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="p-3 text-sm bg-lost/10 text-lost rounded-md border border-lost/20 font-medium">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="bg-background border-border focus:ring-primary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-background border-border focus:ring-primary"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-primary-foreground hover:opacity-90 mt-6"
                        >
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                "Login"
                            )}
                        </Button>
                        <p className="text-sm text-muted-foreground text-center">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="text-primary hover:underline font-semibold"
                            >
                                Sign up
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
