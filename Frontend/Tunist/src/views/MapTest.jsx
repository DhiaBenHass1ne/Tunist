import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
import "/public/leaflet.css"
import "leaflet/dist/leaflet.css";

const MapTest = ({ choice }) => {
  const [positions, setPositions] = useState([
    [36.8065, 10.1815],
    [50.6210, 10.1815],
    [36.4730, 10.1815],
    [36.5340, 10.1815],
    [36.5780, 10.1815]
  ]);

 
 


  return (
    <div className='map-container' style={{ height: '80vh', width: '98%' }}>
      {console.log(choice)}
      {console.log("Map Center:", positions[choice])}
    <MapContainer key={JSON.stringify(positions[choice])} className='leaflet-container' center={positions[choice]} zoom={13} scrollWheelZoom={true}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {JSON.stringify(choice)}
    <Marker position={positions[choice]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
      </div>
    )
}

export default MapTest