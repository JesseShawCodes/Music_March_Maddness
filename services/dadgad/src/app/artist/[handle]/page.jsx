"use client";
import {
  React,
} from 'react';

import { BracketContext } from '@/app/context/BracketContext';
import ErrorBoundary from '@/app/boundary/ErrorBoundary';
import BackToTop from '@/app/components/BackToTop';
import ArtistName from '@/app/components/ArtistName';
import ArtistPageForm from '@/app/components/ArtistPageForm';
import TopTracks from '@/app/components/TopTracks';

function ArtistPage() {
  return (
    <>
      <BracketContext>
        <ErrorBoundary>
          <div className="container-lg">
            <BackToTop />
            <ArtistName />
            <ArtistPageForm />
            <TopTracks />
          </div>
        </ErrorBoundary>
      </BracketContext>
    </>
  )
}

export default ArtistPage;
