"use client";
import {React, useState, useEffect } from 'react';

// Main App component for the maintenance page
const App = () => {
  // Set the target date for when the maintenance is expected to end
  // For demonstration, setting it to 2 days from now.
  // In a real application, you might fetch this from an API or a config.
  const maintenanceEndDate = new Date();
  maintenanceEndDate.setDate(maintenanceEndDate.getDate() + 2); // 2 days from now

  const calculateTimeLeft = () => {
    const difference = +maintenanceEndDate - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // Set up a timer to update the countdown every second
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the timer when the component unmounts or when the countdown finishes
    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="text-3xl md:text-4xl font-bold text-indigo-700 mx-2">
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-10 lg:p-12 max-w-4xl w-full text-center transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-indigo-800 mb-4 animate-fade-in-down">
          Under Maintenance
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed animate-fade-in">
          We're performing some essential upgrades to improve your experience.
          We apologize for any inconvenience this may cause.
        </p>
        <p className="text-md sm:text-lg text-gray-600 animate-fade-in delay-400">
          Thank you for your patience and understanding.
        </p>
      </div>
    </div>
  );
};

export default App;
