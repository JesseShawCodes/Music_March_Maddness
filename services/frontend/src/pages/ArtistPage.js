import React from "react";
import { useParams } from "react-router-dom";
import { useGetArtistInfoQuery } from "../services/jsonServerApi";

import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Albums from "../components/AlbumDetails";
import TopTracks from "../components/TopTracks";
import BackToTop from "../components/BackToTop";
const ArtistPage = () => {
    const setShowButton = (show) => {
        return false
    }
    useEffect(() => {
        const handleScrollButtonVisibility = () => {
            window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
        };
        window.addEventListener('scroll', handleScrollButtonVisibility);
        return () => {
            window.removeEventListener('scroll', handleScrollButtonVisibility);
        }
    }, [])
    const { handle } = useParams()
    const {
        data: musicQuery = [],
        isError,
        error
    } = useGetArtistInfoQuery(handle)

    if (!musicQuery.artist) {
        return <div className="loading">Loading...<FontAwesomeIcon icon={faSpinner  } className="fa-spin" /></div>
    }

    if (isError) {
        console.log({error});
        return <div>Error</div>
    }

    console.log(musicQuery.tracks.tracks)
    return (
        <div className="container">
            <BackToTop />
            {
                !musicQuery.length !== 0 ? 
                    <div>
                        <h1>
                            {musicQuery.artist.name}
                        </h1>
                        <div className="container-sm">
                        <img 
                            src={musicQuery.artist.images[1].url} 
                            className='img-fluid img-thumbnail' 
                            alt={musicQuery.artist.name}
                        />
                        </div>
                        <TopTracks list_items={musicQuery.tracks.tracks}/>
                        <h2>Albums</h2>
                        <Albums list_items={musicQuery.albums.items}/>
                    </div>
                    : 
                    null
            }

        </div>
    )
}

export default ArtistPage;