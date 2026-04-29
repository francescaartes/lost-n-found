import { MapPin, Calendar, User, Bookmark } from "lucide-react";

export default function ItemDetails({ item }: { item: any }) {
    return (
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 shrink-0" />
                {item.category}
            </div>
            <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0" />
                {item.location?.coordinates?.lat ? (
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=$${item.location.coordinates.lat},${item.location.coordinates.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate hover:underline cursor-pointer"
                    >
                        {item.location?.name}
                    </a>
                ) : (
                    <span className="truncate">
                        {item.location?.name || "Unknown Location"}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2">
                <User className="h-4 w-4 shrink-0" />
                {item.postedBy?.name || "User"}
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 shrink-0" />
                {new Date(item.createdAt).toLocaleDateString()}
            </div>
        </div>
    );
}
