import {
	GoogleMap,
  useLoadScript
} from "@react-google-maps/api";
import { ForwardedRef, MutableRefObject, PropsWithChildren, forwardRef, memo, useCallback, useEffect, useMemo } from "react";
import { useOutletContext } from "react-router-dom";
import IViewState from "../../interfaces/AppState/IViewState";
import { CircularProgress } from "@mui/material";
import './Map.css'

export type LatLngLiteral = google.maps.LatLngAltitudeLiteral;
export type MapOptions = google.maps.MapOptions;
export type Map = google.maps.Map;

const mapFunction = forwardRef<Map, PropsWithChildren>(function Map(props, ref: ForwardedRef<Map>) {

  const context = useOutletContext<IViewState>();

  const mapRef = ref as MutableRefObject<Map>;

  const onLoad = useCallback((map: Map) => { mapRef.current = map }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCXnAwt1CIxspRegyw_wdNq3OMVSidKWLE",
  })

  const containerStyle = useMemo(() => {
    const desktopSize = {
      width: "640px",
      height: "480px",
    }

    const mobileSize = {
      width: "360px",
      height: "400px",
    }

    return context.screenSize === 'mobile' ? mobileSize : desktopSize;

  }, [context.screenSize]);

  const defaultCenter = useMemo<LatLngLiteral>(() => {
    return {
      altitude: 0,
      lat: 47.070714, 
      lng: 15.439504
    }
  }, []);

  const mapOptions = useMemo<MapOptions>(() => {
    return {
      isFractionalZoomEnabled: true,
      disableDefaultUI: true,
      mapId: "c60b575fbccc91ba",
    }
  }, [])

  if (!isLoaded) 
    return <div className="progress-indicator">
      <CircularProgress />
    </div>
  return <div>
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={9}
        options={mapOptions}
        onLoad={onLoad}
      >
        {
          props.children
        }
      </GoogleMap>
  </div>
})

export default memo(mapFunction);