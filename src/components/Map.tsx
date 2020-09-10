import React, { useState, createRef, useEffect } from 'react'
import { Map, TileLayer, Marker, LatLng, Polyline, } from 'react-leaflet'
import * as L from 'leaflet'

import '../../src/index.css'
import { LeafletMouseEvent } from 'leaflet'

export const MyMap: React.FC = () => {

    let mapRef = createRef<Map>()

    const [firstPoint, setFirstPoint] = useState<L.LatLng | null>(null)
    const [secondPoint, setSecondPoint] = useState<L.LatLng | null>(null)
    const [distance, setDistance] = useState<number|null>(null)

    const handleClick = (e: LeafletMouseEvent) => {
        if (firstPoint) {
            setSecondPoint(e.latlng)
        } else {
            setFirstPoint(e.latlng)
        }

    }

    useEffect (()=>{
        if (firstPoint && secondPoint) {
            setDistance(firstPoint.distanceTo(secondPoint))
        }
    },[firstPoint,secondPoint])

    const clearMarkers = () => {
        setFirstPoint(null)
        setSecondPoint(null)
    }

    return (
        <div style={{ height: '350px' , display:'flex',flexDirection:'column'}} >
            <Map center={[59, 59]} zoom={7} onclick={handleClick} ref={mapRef}>
                {firstPoint && <Marker position={firstPoint} />}

                {secondPoint && <Marker position={secondPoint} />}

                {(firstPoint && secondPoint) && <Polyline positions={[firstPoint, secondPoint]} />}

                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            </Map>
            {
                (firstPoint&&secondPoint)
                ? (
                <div>
                    <button onClick={clearMarkers}> Очистить </button> 
                    <br/>
                    <span> Расстояние между точками {distance?.toFixed(2)} метров</span>
                </div>
                )
                : null
            }
        </div>
    )
}