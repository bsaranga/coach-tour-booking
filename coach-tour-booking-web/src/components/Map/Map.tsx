import {
	GoogleMap,
	LoadScript,
	useLoadScript,
} from "@react-google-maps/api";
import { memo, useEffect } from "react";

const containerStyle = {
	width: "400px",
	height: "400px",
};

const center = {
	lat: -3.745,
	lng: -38.523,
};

const mapFunction = function Map() {
	return <LoadScript
      googleMapsApiKey="AIzaSyCXnAwt1CIxspRegyw_wdNq3OMVSidKWLE"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </LoadScript>
}

export default memo(mapFunction);