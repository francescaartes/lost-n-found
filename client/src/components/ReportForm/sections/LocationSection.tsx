import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import LocationMap from "@/components/LocationMap";

import { MapPin } from "lucide-react";

type Coordinates = {
    lat: number;
    lng: number;
};

export default function LocationSection({
    name,
    onChange,
    coordinates,
    onSelect,
}: {
    name: string;
    onChange: (val: string) => void;
    coordinates: Coordinates;
    onSelect: (position: Coordinates) => void;
}) {
    return (
        <>
            <div className="space-y-4">
                <Label>Location</Label>

                <div className="space-y-2">
                    <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                        <Input
                            className="pl-9"
                            placeholder="e.g. Biñan Bayan"
                            value={name}
                            onChange={(e) => onChange(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="w-full h-65 rounded-lg border overflow-hidden">
                        <LocationMap
                            initialPosition={coordinates}
                            onSelect={(lat, lng) => onSelect({ lat, lng })}
                        />
                    </div>

                    {coordinates.lat !== 0 && (
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                            <span>
                                {coordinates.lat.toFixed(4)},{" "}
                                {coordinates.lng.toFixed(4)}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
