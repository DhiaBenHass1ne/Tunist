import React, { useState } from 'react'
import { MapContainer, TileLayer, useMap,Marker,Popup } from 'react-leaflet'
import "/public/leaflet.css"
import "leaflet/dist/leaflet.css";

const MapTest = () => {

  const [positions,setPositions] =useState([[36.8065, 10.1815],[36.8065, 10.1815],[36.8065, 10.1815],[36.8065, 10.1815],[36.8065, 10.1815]])



  return (
    <div className='map-container' style={{ height: '400px', width: '100%' }}>
    <MapContainer className='leaflet-container' center={[36.8065, 10.1815]} zoom={13} scrollWheelZoom={true} >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    <Marker position={[36.8065, 10.1815]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
      </div>
    )
}

export default MapTest