import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
import "/public/leaflet.css"
import "leaflet/dist/leaflet.css";
import L from 'leaflet';


const MapTest = ({ choice,pos ,setPos,setNewCenter,newCenter, position, setPosition, positions,setPositions, status}) => {

    

    function DraggableMarker({ pos, setPos }) {
      const [draggable, setDraggable] = useState(false);
      const markerRef = useRef(null);
    
      const eventHandlers = useMemo(
        () => ({
          dragend() {
            const marker = markerRef.current;
            if (marker != null) {
              var lat= marker.getLatLng().lat;
              var lng= marker.getLatLng().lng;

              // setPos([newPosition.lat, newPosition.lng]);
              setPosition([lat,lng]);
              console.log("postition from maptest ==>"+position)
              console.log("this is pos==>"+position)
            }
          },
        }),
        [position]
      );
    
      const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d);
      }, []);
    
      return (
        <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          // position={pos || position}
          position={position}
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
    function ChangeView({ center }) {
      const map = useMap();
      useEffect(()=>{
        map.setView(center);
      },[center])
      return null;
    }
  

  return (
    <div className='map-container' style={{ height: '80vh', width: '98%' }}>
    <MapContainer 
     className='leaflet-container ' center={newCenter ? newCenter:position} zoom={13} scrollWheelZoom={true}  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        status && 
        <DraggableMarker pos={pos} setPos={setPos} />
      }

      {
        positions.map((p,idx)=>{
          return (
            
             <Marker key={idx}  position={p}>
      <Popup>
        <img style={{width:"3rem"}} src="/public/tunisit-logo.png" alt="" />
      </Popup>
    </Marker>
            
          )
        })
      }
    <ChangeView center={ newCenter} />
  </MapContainer>
      </div>
    )
}

export default MapTest