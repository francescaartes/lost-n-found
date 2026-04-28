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

import { UserPlus, Loader2 } from "lucide-react";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const res = await api.post("/auth/register", formData);
            login(res.data.user);
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-full w-full flex items-center justify-center p-4 bg-linear-to-br from-background via-background to-primary/5">
            <Card className="w-full max-w-lg border border-border/60 shadow-xl rounded-2xl bg-card/95 backdrop-blur">
                <CardHeader className="space-y-2 text-center">
                    <div className="mx-auto p-3 bg-primary/10 rounded-2xl w-fit">
                        <UserPlus className="h-7 w-7 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">
                        Create your account
                    </CardTitle>
                    <CardDescription>
                        Join the community and start reporting lost or found
                        items
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-5">
                        {error && (
                            <div className="p-3 text-sm rounded-lg border border-red-200 bg-red-50 text-red-700">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                placeholder="Juan dela Cruz"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                placeholder="name@email.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                value={formData.password}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-2 bg-primary hover:bg-primary/90 transition"
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                "Create account"
                            )}
                        </Button>
                    </CardContent>
                    <CardFooter className="flex justify-center text-sm text-muted-foreground mt-2">
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="ml-1 text-primary hover:underline font-medium"
                        >
                            Sign in
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
