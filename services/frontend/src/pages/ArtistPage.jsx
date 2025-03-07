import {
  React,
} from 'react';

import BackToTop from '../components/BackToTop';
import TopTracks from '../components/TopTracks';
import BracketContext from '../components/BracketContext';
import ArtistPageForm from '../components/ArtistPageForm';
import ArtistName from '../components/ArtistName';

function ArtistPage() {
  return (
    <BracketContext>
      <div className="container-lg">
        <BackToTop />
        <ArtistName />
        <ArtistPageForm />
        <TopTracks />
      </div>
    </BracketContext>
  );
}

export default ArtistPage;
