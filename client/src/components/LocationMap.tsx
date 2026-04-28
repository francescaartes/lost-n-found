import { useState, useEffect } from "react";
import {
    MapContainer,
    TileLayer,
    Marker,
    useMapEvents,
    useMap,
} from "react-leaflet";
import L from "leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapEvents({
    onLocationSelect,
}: {
    onLocationSelect: (lat: number, lng: number) => void;
}) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

function MapUpdater({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
}

interface LocationMapProps {
    onSelect: (lat: number, lng: number) => void;
    initialPosition?: { lat: number; lng: number } | null;
}

export default function LocationMap({
    onSelect,
    initialPosition = null,
}: LocationMapProps) {
    const [position, setPosition] = useState<{
        lat: number;
        lng: number;
    } | null>(initialPosition);

    const [mapCenter, setMapCenter] = useState<[number, number]>(
        initialPosition && initialPosition.lat !== 0
            ? [initialPosition.lat, initialPosition.lng]
            : [14.5995, 121.0366],
    );

    useEffect(() => {
        if (initialPosition && initialPosition.lat !== 0) return;

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setMapCenter([latitude, longitude]);
                },
                (err) => {
                    console.warn("Geolocation denied or failed:", err.message);
                },
            );
        }
    }, [initialPosition]);

    const handleSelect = (lat: number, lng: number) => {
        setPosition({ lat, lng });
        onSelect(lat, lng);
    };

    return (
        <div className="h-full min-h-62.5 w-full rounded-md overflow-hidden border border-zinc-200 z-0 relative">
            <MapContainer
                center={mapCenter}
                zoom={14}
                style={{ height: "100%", width: "100%", minHeight: "250px" }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapUpdater center={mapCenter} />

                <MapEvents onLocationSelect={handleSelect} />

                {position && position.lat !== 0 && (
                    <Marker position={[position.lat, position.lng]} />
                )}
            </MapContainer>

            {!position?.lat && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-400 bg-white/90 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm pointer-events-none text-zinc-700">
                    Click the map to drop a pin
                </div>
            )}
        </div>
    );
}
