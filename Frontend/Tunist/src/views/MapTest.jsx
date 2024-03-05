import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
import "/public/leaflet.css"
import "leaflet/dist/leaflet.css";
import L from 'leaflet';


const MapTest = ({ choice,setPos,pos }) => {
  const [positions, setPositions] = useState([
    [36.8065, 10.1815],
    [50.6210, 10.1815],
    [36.4730, 10.1815],
    [36.5340, 10.1815],
    [36.5780, 10.1815]
  ]);
  

    function DraggableMarker({ pos, setPos }) {
      const [draggable, setDraggable] = useState(false);
      const [position, setPosition] = useState([36.8065, 10.1815]);
      const markerRef = useRef(null);
    
      const eventHandlers = useMemo(
        () => ({
          dragend() {
            const marker = markerRef.current;
            if (marker != null) {
              const newPosition = marker.getLatLng();
              setPos([newPosition.lat, newPosition.lng]);
              console.log('Marker position:', newPosition);
              setPosition(marker.getLatLng());
            }
          },
        }),
        [setPos]
      );
    
      const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d);
      }, []);
    
      return (
        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={pos || position}
          ref={markerRef}
        >
          <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
              {draggable
                ? 'Marker is draggable'
                : 'Click here to make marker draggable'}
            </span>
          </Popup>
        </Marker>
      );
    }


  

  return (
    <div className='map-container' style={{ height: '80vh', width: '98%' }}>
      {console.log(choice)}
      {console.log("Map Center:", positions[choice])}
    <MapContainer key={JSON.stringify(positions[choice])} className='leaflet-container ' center={positions[choice]} zoom={13} scrollWheelZoom={true}      
>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <DraggableMarker />

      {JSON.stringify(choice)}
    {/* <Marker position={positions[choice]}>
      <Popup>
        <img style={{width:"3rem"}} src="/public/tunisit-logo.png" alt="" />
      </Popup>
    </Marker> */}
  </MapContainer>
      </div>
    )
}

export default MapTest