"use client";

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // Dynamically import Bootstrap's JavaScript
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null; // This component doesn't render any UI
}