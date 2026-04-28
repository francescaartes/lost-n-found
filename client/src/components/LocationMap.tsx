import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'

import icon from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
})
L.Marker.prototype.options.icon = DefaultIcon

function MapEvents({ onLocationSelect }: { onLocationSelect: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onLocationSelect(e.latlng.lat, e.latlng.lng)
        },
    })
    return null
}

interface LocationMapProps {
    onSelect: (lat: number, lng: number) => void;
    defaultLat?: number;
    defaultLng?: number;
}

export default function LocationMap({ onSelect, defaultLat = 14.5995, defaultLng = 121.0366 }: LocationMapProps) {
    // Defaulting to Manila coordinates, you can change this to PUP coordinates!
    const [position, setPosition] = useState<{ lat: number, lng: number } | null>(null)

    const handleSelect = (lat: number, lng: number) => {
        setPosition({ lat, lng })
        onSelect(lat, lng)
    }

    return (
        <div className="h-[300px] w-full rounded-md overflow-hidden border border-zinc-200 z-0 relative">
            <MapContainer
                center={[defaultLat, defaultLng]}
                zoom={14}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapEvents onLocationSelect={handleSelect} />
                {position && <Marker position={[position.lat, position.lng]} />}
            </MapContainer>

            {!position && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 z-[400] bg-white/90 px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm pointer-events-none text-zinc-700">
                    Click the map to drop a pin
                </div>
            )}
        </div>
    )
}