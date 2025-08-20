import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Vehicle data with speed, icon, and display name
const vehicles = {
  car: { speed: 40, icon: '🚗', name: 'Standard Car', priceMultiplier: 1 },
  premium: { speed: 45, icon: '🚙', name: 'Premium Car', priceMultiplier: 1.5 },
  truck: { speed: 30, icon: '🚚', name: 'Truck', priceMultiplier: 2 },
  bus: { speed: 20, icon: '🚌', name: 'Bus', priceMultiplier: 0.8 }
};

// Payment methods
const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: '💳' },
  { id: 'card', name: 'Credit/Debit Card', icon: '💲' },
  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
  { id: 'wallet', name: 'Wallet', icon: '💰' },
  { id: 'cash', name: 'Cash on Delivery', icon: '💵' }
];

// Base price per km in dollars
const BASE_PRICE_PER_KM = 1.5;

function RideBookingPage() {
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState('');
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [vehicle, setVehicle] = useState('');
  const [driverLocation, setDriverLocation] = useState(null);
  const [arrivalTime, setArrivalTime] = useState(null);
  const [distance, setDistance] = useState(0);
  const [price, setPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rideStatus, setRideStatus] = useState('pending'); // pending, accepted, arriving, completed
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const intervalRef = useRef(null);
  const mapRef = useRef();

  // Fix for default marker icons
  useEffect(() => {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  // Custom icons
  const userIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4474/4474287.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const driverIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const destinationIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/4474/4474284.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // Get user current location on load
  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        setIsLoading(false);
      },
      err => {
        console.error(err);
        setError('Could not get your location. Please enable location services.');
        setIsLoading(false);
        // Set default location if geolocation fails
        setUserLocation([20.5937, 78.9629]); // Default to India coordinates
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Recalculate when inputs change
  useEffect(() => {
    if (userLocation && destinationCoords && vehicle) {
      const dist = calculateDistance(userLocation, destinationCoords);
      setDistance(dist);
      
      const speed = vehicles[vehicle].speed;
      const eta = Math.round((dist / 1000 / speed) * 60);
      setArrivalTime(eta);
      
      const calculatedPrice = (dist / 1000 * BASE_PRICE_PER_KM * vehicles[vehicle].priceMultiplier).toFixed(2);
      setPrice(calculatedPrice);
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

    setRideStatus('driver-coming');
    
    intervalRef.current = setInterval(() => {
      if (step >= steps) {
        clearInterval(intervalRef.current);
        setRideStatus('arrived');
        return;
      }
      lat += latStep;
      lng += lngStep;
      setDriverLocation([lat, lng]);
      step++;
    }, 300);
  };

  const handleDestinationSearch = async () => {
    if (!destination.trim()) {
      setError('Please enter a destination');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(destination)}`
      );
      const data = await res.json();
      
      if (data.length > 0) {
        const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
        setDestinationCoords(coords);
        mapRef.current?.flyTo(coords, 15);
        setDriverLocation(null);
        setVehicle('');
        setRideStatus('pending');
      } else {
        setError('Destination not found. Please try a different location.');
      }
    } catch (err) {
      setError('Failed to search for destination. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVehicleSelect = (vehicleType) => {
    setVehicle(vehicleType);
    setShowPaymentModal(true);
  };

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleConfirmPayment = () => {
    if (!selectedPayment) {
      setError('Please select a payment method');
      return;
    }
    
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      setRideStatus('accepted');
      simulateDriverMovement(userLocation, destinationCoords);
    }, 1500);
  };

  const getStatusMessage = () => {
    switch (rideStatus) {
      case 'accepted':
        return 'Driver has accepted your ride!';
      case 'driver-coming':
        return 'Driver is on the way!';
      case 'arrived':
        return 'Driver has arrived!';
      default:
        return 'Ready to book your ride';
    }
  };

  return (
    <div className="ride-booking-container">
      <div className="map-container">
        <MapContainer
          center={userLocation || [20.5937, 78.9629]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          whenCreated={map => (mapRef.current = map)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
              <Popup>Your Location</Popup>
            </Marker>
          )}
          {destinationCoords && (
            <Marker position={destinationCoords} icon={destinationIcon}>
              <Popup>Destination</Popup>
            </Marker>
          )}
          {driverLocation && (
            <Marker position={driverLocation} icon={driverIcon}>
              <Popup>Your Driver</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      <div className="booking-panel">
        <h2 className="panel-title">Book Your Ride</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="input-group">
          <label htmlFor="destination">Destination</label>
          <div className="search-box">
            <input
              id="destination"
              type="text"
              value={destination}
              placeholder="Enter destination address"
              onChange={e => setDestination(e.target.value)}
              disabled={isLoading}
            />
            <button 
              onClick={handleDestinationSearch}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {destinationCoords && (
          <>
            <div className="input-group">
              <label>Select Vehicle</label>
              <div className="vehicle-options">
                {Object.entries(vehicles).map(([key, {icon, name}]) => (
                  <div 
                    key={key}
                    className={`vehicle-option ${vehicle === key ? 'selected' : ''}`}
                    onClick={() => handleVehicleSelect(key)}
                  >
                    <span className="vehicle-icon">{icon}</span>
                    <span className="vehicle-name">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            {vehicle && (
              <div className="ride-summary">
                <h3>Ride Summary</h3>
                <div className="summary-item">
                  <span>Distance:</span>
                  <span>{(distance / 1000).toFixed(1)} km</span>
                </div>
                <div className="summary-item">
                  <span>Estimated Time:</span>
                  <span>{arrivalTime} minutes</span>
                </div>
                <div className="summary-item">
                  <span>Price:</span>
                  <span>${price}</span>
                </div>
                
                <button 
                  className="book-button"
                  onClick={() => setShowPaymentModal(true)}
                  disabled={rideStatus !== 'pending'}
                >
                  {rideStatus === 'pending' ? 'Proceed to Payment' : getStatusMessage()}
                </button>
                
                {rideStatus !== 'pending' && (
                  <div className="status-message">
                    <div className={`status-indicator ${rideStatus}`}></div>
                    <p>{getStatusMessage()}</p>
                    {rideStatus === 'driver-coming' && (
                      <p>Estimated arrival in <strong>{arrivalTime}</strong> minutes</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="payment-modal">
          <div className="payment-modal-content">
            <div className="payment-modal-header">
              <h3>Select Payment Method</h3>
              <button 
                className="close-button"
                onClick={() => setShowPaymentModal(false)}
                disabled={isProcessingPayment}
              >
                &times;
              </button>
            </div>
            
            <div className="payment-options">
              {paymentMethods.map(method => (
                <div 
                  key={method.id}
                  className={`payment-option ${selectedPayment === method.id ? 'selected' : ''}`}
                  onClick={() => handlePaymentSelect(method.id)}
                >
                  <span className="payment-icon">{method.icon}</span>
                  <span className="payment-name">{method.name}</span>
                </div>
              ))}
            </div>
            
            <div className="payment-summary">
              <div className="summary-item">
                <span>Vehicle:</span>
                <span>{vehicles[vehicle]?.name}</span>
              </div>
              <div className="summary-item">
                <span>Distance:</span>
                <span>{(distance / 1000).toFixed(1)} km</span>
              </div>
              <div className="summary-item total">
                <span>Total Amount:</span>
                <span>${price}</span>
              </div>
            </div>
            
            <button 
              className="confirm-payment-button"
              onClick={handleConfirmPayment}
              disabled={!selectedPayment || isProcessingPayment}
            >
              {isProcessingPayment ? 'Processing Payment...' : 'Confirm Payment'}
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        .ride-booking-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          position: relative;
        }
        
        .map-container {
          height: 50vh;
          width: 100%;
          z-index: 1;
        }
        
        .booking-panel {
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #ddd;
          flex-grow: 1;
          overflow-y: auto;
        }
        
        .panel-title {
          margin: 0 0 20px;
          color: #333;
          font-size: 24px;
        }
        
        .input-group {
          margin-bottom: 20px;
        }
        
        .input-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #555;
        }
        
        .search-box {
          display: flex;
          gap: 10px;
        }
        
        .search-box input {
          flex: 1;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 16px;
        }
        
        .search-box button {
          padding: 0 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }
        
        .search-box button:hover {
          background: #0056b3;
        }
        
        .search-box button:disabled {
          background: #cccccc;
          cursor: not-allowed;
        }
        
        .vehicle-options {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
        }
        
        .vehicle-option {
          padding: 15px 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .vehicle-option:hover {
          border-color: #007bff;
          background: #f0f7ff;
        }
        
        .vehicle-option.selected {
          border-color: #007bff;
          background: #e1f0ff;
        }
        
        .vehicle-icon {
          font-size: 24px;
          display: block;
          margin-bottom: 5px;
        }
        
        .vehicle-name {
          font-size: 14px;
          font-weight: 500;
        }
        
        .ride-summary {
          margin-top: 30px;
          padding: 20px;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .ride-summary h3 {
          margin-top: 0;
          color: #333;
        }
        
        .summary-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .summary-item span:first-child {
          color: #666;
        }
        
        .summary-item span:last-child {
          font-weight: 600;
        }
        
        .summary-item.total {
          border-top: 1px solid #ddd;
          padding-top: 10px;
          margin-top: 10px;
          font-size: 1.1em;
        }
        
        .book-button {
          width: 100%;
          padding: 15px;
          margin-top: 20px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .book-button:hover {
          background: #218838;
        }
        
        .book-button:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }
        
        .status-message {
          margin-top: 20px;
          text-align: center;
          padding: 15px;
          background: #f8f9fa;
          border-radius: 6px;
        }
        
        .status-indicator {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          margin: 0 auto 10px;
        }
        
        .status-indicator.accepted {
          background: #ffc107;
          animation: pulse 2s infinite;
        }
        
        .status-indicator.driver-coming {
          background: #17a2b8;
          animation: pulse 1.5s infinite;
        }
        
        .status-indicator.arrived {
          background: #28a745;
        }
        
        .error-message {
          padding: 10px;
          margin-bottom: 15px;
          background: #f8d7da;
          color: #721c24;
          border-radius: 4px;
          border: 1px solid #f5c6cb;
        }
        
        /* Payment Modal Styles */
        .payment-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .payment-modal-content {
          background: white;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: 20px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        
        .payment-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .payment-modal-header h3 {
          margin: 0;
          color: #333;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 5px;
        }
        
        .close-button:hover {
          color: #333;
        }
        
        .close-button:disabled {
          color: #ccc;
          cursor: not-allowed;
        }
        
        .payment-options {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          gap: 10px;
          margin-bottom: 20px;
        }
        
        .payment-option {
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 8px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .payment-option:hover {
          border-color: #007bff;
          background: #f0f7ff;
        }
        
        .payment-option.selected {
          border-color: #007bff;
          background: #e1f0ff;
        }
        
        .payment-icon {
          font-size: 24px;
          display: block;
          margin-bottom: 5px;
        }
        
        .payment-name {
          font-size: 14px;
          font-weight: 500;
        }
        
        .payment-summary {
          margin: 20px 0;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }
        
        .confirm-payment-button {
          width: 100%;
          padding: 15px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .confirm-payment-button:hover {
          background: #218838;
        }
        
        .confirm-payment-button:disabled {
          background: #6c757d;
          cursor: not-allowed;
        }
        
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.7; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.7; }
        }
        
        @media (min-width: 768px) {
          .ride-booking-container {
            flex-direction: row;
          }
          
          .map-container {
            height: 100vh;
            width: 60%;
          }
          
          .booking-panel {
            width: 40%;
            border-top: none;
            border-left: 1px solid #ddd;
          }
        }
      `}</style>
    </div>
  );
}

export default RideBookingPage;
