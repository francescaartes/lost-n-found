import { useState } from "react";
import { UndoDot } from "lucide-react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SidebarContent from "./SidebarContent";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 shrink-0 sticky top-0 z-50">
            <div className="flex items-center gap-2 md:gap-4">
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="-ml-2"
                            >
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>

                        <SheetContent
                            side="left"
                            className="p-0 w-64 flex flex-col"
                        >
                            <div className="p-4 border-b h-16 flex items-center">
                                <h2 className="font-bold text-lg text-primary">
                                    Menu
                                </h2>
                            </div>
                            <SidebarContent
                                onNavigate={() => setIsOpen(false)}
                            />
                        </SheetContent>
                    </Sheet>
                </div>

                <Link to="/">
                    <div className="flex items-center gap-2 text-primary font-bold text-xl">
                        <UndoDot className="h-6 w-6" />
                        <span className="sm:inline-block">TraceBack</span>
                    </div>
                </Link>
            </div>
        </header>
    );
}
