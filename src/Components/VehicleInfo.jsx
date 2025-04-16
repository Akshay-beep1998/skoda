// VehicleTracker.jsx
import React, { useState, useEffect } from "react";

// Mock log data for destinations
const vehicleLog = [
  { vin: "1HGCM82633A004352", destination: "Los Angeles, CA" },
  { vin: "WDBUF56X58B304689", destination: "Chicago, IL" },
  { vin: "1FAFP4041WF120845", destination: "New York, NY" },
  { vin: "2T1BURHE7JC048637", destination: "Houston, TX" },
];

// Mock VINs to simulate being fetched one after another
const mockVinFeed = [
  "1HGCM82633A004352",
  "WDBUF56X58B304689",
  "1FAFP4041WF120845",
  "2T1BURHE7JC048637",
  "INVALIDVIN12345678"
];

const VehicleTracker = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [vin, setVin] = useState("");
  const [destination, setDestination] = useState("Waiting for VIN...");

  // Update clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate fetching VIN every 5 seconds
  useEffect(() => {
    let index = 0;
    const fetchVin = () => {
      const newVin = mockVinFeed[index];
      setVin(newVin);
      index = (index + 1) % mockVinFeed.length;
    };

    fetchVin(); // initial fetch
    const vinTimer = setInterval(fetchVin, 5000);

    return () => clearInterval(vinTimer);
  }, []);

  // Whenever VIN changes, check the log for destination
  useEffect(() => {
    if (!vin) return;
    const logEntry = vehicleLog.find(entry => entry.vin === vin);
    if (logEntry) {
      setDestination(logEntry.destination);
    } else {
      setDestination("Unknown destination (VIN not found in logs)");
    }
  }, [vin]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>🚗 Vehicle VIN Tracker</h2>
      <p><strong>Time:</strong> {currentTime.toLocaleTimeString()}</p>
      <p><strong>Date:</strong> {currentTime.toLocaleDateString()}</p>
      <p><strong>Current VIN:</strong> {vin}</p>
      <p><strong>Destination:</strong> {destination}</p>
    </div>
  );
};

export default VehicleTracker;
