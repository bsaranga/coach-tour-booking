import { useEffect, useRef } from "react"

export default function Map() {

    const mapRef = useRef<HTMLDivElement>(null);
    let map: any;
    
    useEffect(() => {
        
        async function initMap(): Promise<void> {
            const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
            map = new Map(mapRef.current as HTMLDivElement, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        }

        initMap();
    }, [])

    return <div ref={mapRef}>Map</div>
}