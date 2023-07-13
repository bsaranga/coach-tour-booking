import {
	GoogleMap,
  GoogleMapProps,
  useLoadScript
} from "@react-google-maps/api";
import { memo, useCallback, useMemo, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import IViewState from "../../interfaces/AppState/IViewState";

const containerStyle = {
	width: "640px",
	height: "480px",
};

type LatLngLiteral = google.maps.LatLngAltitudeLiteral;
type MapOptions = google.maps.MapOptions;
type Map = google.maps.Map;

const mapFunction = function Map() {
  const context = useOutletContext<IViewState>();
  const mapRef = useRef<Map>();

  const onLoad = useCallback((map: Map) => { mapRef.current = map }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCXnAwt1CIxspRegyw_wdNq3OMVSidKWLE",
  })

  const center = useMemo<LatLngLiteral>(() => {
    return {
      altitude: 0,
      lat: -3.745,
      lng: -38.523
    }
  }, []);

  const mapOptions = useMemo<MapOptions>(() => {
    return {
      isFractionalZoomEnabled: true,
      disableDefaultUI: true,
      mapId: "c60b575fbccc91ba",
    }
  }, [])

  if (!isLoaded) return <div>Loading...</div>
  return <div>
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        options={mapOptions}
        onLoad={onLoad}
      >
      </GoogleMap>
  </div>
}

export default memo(mapFunction);