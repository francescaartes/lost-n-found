import { useState } from "react";
import { MapPin, Calendar, User, Bookmark, Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ItemModal from "./ItemModal";

export default function ReportCard({ item }: { item: any }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Card
                onClick={() => setIsModalOpen(true)}
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group border-border bg-background"
            >
                <CardContent className="p-0 flex flex-col sm:flex-row">
                    <div className="w-full sm:w-48 h-48 sm:h-auto bg-muted/50 flex items-center justify-center border-r border-border group-hover:bg-muted transition-colors">
                        <Image className="h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between bg-card text-card-foreground">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <span
                                    className={`text-xs font-bold px-2 py-1 rounded-md ${
                                        item.type === "Lost"
                                            ? "bg-lost/15 text-lost"
                                            : "bg-found/15 text-found"
                                    }`}
                                >
                                    {item.type}
                                </span>
                                <span
                                    className={`text-xs font-medium px-2 py-1 rounded-md ${
                                        item.status === "Resolved"
                                            ? "bg-found/15 text-found"
                                            : "bg-destructive/15 text-destructive"
                                    }`}
                                >
                                    {item.status || "Unresolved"}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {item.description}
                            </p>
                        </div>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-3 w-3 shrink-0" />
                                <span className="truncate">
                                    {item.location?.name}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-3 w-3 shrink-0" />
                                {new Date(item.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                                <User className="h-3 w-3 shrink-0" />{" "}
                                {item.postedBy?.name || "User"}
                            </div>
                            <div className="flex items-center gap-2">
                                <Bookmark className="h-3 w-3 shrink-0" />{" "}
                                {item.category}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <ItemModal
                item={item}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
