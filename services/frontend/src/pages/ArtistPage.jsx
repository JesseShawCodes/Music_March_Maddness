import {
  React,
} from 'react';

import BackToTop from '../components/BackToTop';
import TopTracks from '../components/TopTracks';
import BracketContext from '../context/BracketContext';
import ArtistPageForm from '../components/ArtistPageForm';
import ArtistName from '../components/ArtistName';
import ErrorBoundary from '../boundary/ErrorBoundary';

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
  );
}

export default ArtistPage;
