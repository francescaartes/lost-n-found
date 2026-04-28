import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import ReportItem from "@/pages/ReportItem";
import MyReports from "@/pages/MyReports";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
    return (
        <Router>
            <div className="h-screen flex flex-col bg-background font-sans overflow-hidden">
                <Header />

                <div className="flex-1 flex overflow-hidden">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route element={<ProtectedRoute />}>
                            <Route
                                path="*"
                                element={
                                    <>
                                        <Sidebar />
                                        <main className="flex-1 overflow-y-auto p-4 md:p-8">
                                            <Routes>
                                                <Route
                                                    path="/"
                                                    element={<Home />}
                                                />
                                                <Route
                                                    path="/report"
                                                    element={<ReportItem />}
                                                />
                                                <Route
                                                    path="/my-reports"
                                                    element={<MyReports />}
                                                />
                                            </Routes>
                                        </main>
                                    </>
                                }
                            />
                        </Route>
                    </Routes>
                </div>
            </div>
            <Toaster />
        </Router>
    );
}
