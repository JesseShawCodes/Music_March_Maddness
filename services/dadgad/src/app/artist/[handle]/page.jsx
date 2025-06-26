"use client";
import {
  React,
} from 'react';

import { BracketContext, Context } from '@/app/context/BracketContext';
import BracketTable from '@/app/components/BracketTable';
import { useGetArtistInfoQuery } from '@/app/services/jsonServerApi';
import Loading from '@/app/components/Loading';
import ErrorBoundary from '@/app/boundary/ErrorBoundary';
import BackToTop from '@/app/components/BackToTop';
import ArtistName from '@/app/components/ArtistName';
import ArtistPageForm from '@/app/components/ArtistPageForm';
import TopTracks from '@/app/components/TopTracks';

function ArtistPage() {
  return (
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
  )
}

export default ArtistPage;
