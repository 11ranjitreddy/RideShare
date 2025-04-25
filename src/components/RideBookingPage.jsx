import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const vehicleSpeeds = { car: 40, truck: 30, bus: 20 }; // in km/h

function RideBookingPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState('');
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [vehicle, setVehicle] = useState('');
  const [driverLocation, setDriverLocation] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const intervalRef = useRef(null);
  const mapRef = useRef();

  // Get user current location on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      err => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  // Recalculate ETA and simulate driver movement when everything is selected
  useEffect(() => {
    if (userLocation && destinationCoords && vehicle) {
      const distance = calculateDistance(userLocation, destinationCoords);
      const speed = vehicleSpeeds[vehicle];
      const eta = (distance / 1000 / speed) * 60;
      setArrivalTime(Math.round(eta));
      simulateDriverMovement(userLocation, destinationCoords);
    }
  }, [userLocation, destinationCoords, vehicle]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const calculateDistance = (start, end) => {
    const from = L.latLng(start[0], start[1]);
    const to = L.latLng(end[0], end[1]);
    return from.distanceTo(to); // meters
  };

  const simulateDriverMovement = (start, end) => {
    clearInterval(intervalRef.current);
    let step = 0;
    const steps = 100;
    let lat = start[0];
    let lng = start[1];
    const latStep = (end[0] - lat) / steps;
    const lngStep = (end[1] - lng) / steps;

    intervalRef.current = setInterval(() => {
      if (step >= steps) {
        clearInterval(intervalRef.current);
        return;
      }
      lat += latStep;
      lng += lngStep;
      setDriverLocation([lat, lng]);
      step++;
    }, 300);
  };

  const handleDestinationSearch = async () => {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`);
    const data = await res.json();
    if (data.length > 0) {
      const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      setDestinationCoords(coords);
      mapRef.current?.flyTo(coords, 13);
      setArrivalTime(null);  // reset previous ride info
      setDriverLocation(null); // reset driver location
    } else {
      alert('Destination not found. Try again.');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <MapContainer
        center={userLocation || [20.5937, 78.9629]}
        zoom={13}
        style={{ height: '50vh' }}
        whenCreated={map => (mapRef.current = map)}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {userLocation && <Marker position={userLocation}><Popup>You are here</Popup></Marker>}
        {destinationCoords && <Marker position={destinationCoords}><Popup>Destination</Popup></Marker>}
        {driverLocation && (
          <Marker
            position={driverLocation}
            icon={L.icon({
              iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
              iconSize: [30, 30],
            })}
          >
            <Popup>Driver</Popup>
          </Marker>
        )}
      </MapContainer>

      <div style={{ padding: 20 }}>
        <h3>Select Destination</h3>
        <input
          type="text"
          value={destination}
          placeholder="Enter destination"
          onChange={e => setDestination(e.target.value)}
          style={{ padding: '8px', width: '60%' }}
        />
        <button onClick={handleDestinationSearch} style={{ marginLeft: '10px', padding: '8px 16px' }}>Search</button>

        {destinationCoords && (
          <div style={{ marginTop: 20 }}>
            <h4>Select Vehicle:</h4>
            {['car', 'truck', 'bus'].map(v => (
              <button
                key={v}
                onClick={() => setVehicle(v)}
                style={{
                  margin: '5px',
                  padding: '10px 20px',
                  backgroundColor: vehicle === v ? '#007bff' : '#eee',
                  color: vehicle === v ? '#fff' : '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {v === 'car' ? '🚗 Car' : v === 'truck' ? '🚚 Truck' : '🚌 Bus'}
              </button>
            ))}
          </div>
        )}

        {arrivalTime && (
          <div style={{ marginTop: 20 }}>
            <h4>Ride Info</h4>
            <p>Driver accepted the ride!</p>
            <p>Estimated arrival in <strong>{arrivalTime}</strong> minutes</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RideBookingPage;
