"use client";
import {
  React,
} from 'react';
// import dynamic from 'next/dynamic';

import { BracketContext } from '@/app/context/BracketContext';
import ErrorBoundary from '@/app/boundary/ErrorBoundary';
// import BackToTop from '@/app/components/BackToTop';
import ArtistName from '@/app/components/ArtistName';
import ArtistPageForm from '@/app/components/ArtistPageForm';
import TopTracks from '@/app/components/TopTracks';

/*
const ClientSideComponent = dynamic(
  () => 
);
*/

function ArtistPage() {
  return (
    <BracketContext>
      <ErrorBoundary>
        <div className="container-lg">
          <ArtistName />
          <ArtistPageForm />
          <TopTracks />
        </div>
      </ErrorBoundary>
    </BracketContext>
  )
}

export default ArtistPage;
