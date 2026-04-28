import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Home from "@/pages/Home";
import Report from "@/pages/Report";
import Dashboard from "@/pages/Dashboard";

export default function App() {
    return (
        <Router>
            <div className="h-screen flex bg-background font-sans overflow-hidden">
                {/* Sidebar */}
                <Sidebar />

                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <Header />

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto p-4 md:p-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/report" element={<Report />} />
                            <Route
                                path="/my-reports"
                                element={<Dashboard title="My Reports" />}
                            />
                            <Route
                                path="/saved"
                                element={<Dashboard title="Saved Items" />}
                            />
                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}
