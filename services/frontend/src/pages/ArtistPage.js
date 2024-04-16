import React from "react";
import { useParams } from "react-router-dom";
import { useGetArtistInfoQuery } from "../services/jsonServerApi";



const ArtistPage = () => {
    const { handle } = useParams()
    const {
        data: musicQuery = [],
        isError,
        error
    } = useGetArtistInfoQuery(handle)

    if (!musicQuery.artist) {
        return <div>Loading...</div>
    }

    if (isError) {
        console.log({error});
        return <div>Error</div>
    }

    /*
    https://blog.logrocket.com/create-search-bar-react-from-scratch/
    */
   console.log(musicQuery)
   console.log(handle)
    return (
        <div className="container">
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
                        <div>
                            <ol className="list-group list-group-numbered"> 
                            {musicQuery.tracks.tracks?.map((key, index) => (
                                <li className="list-group-item" key={index}>
                                    {key.name} - {key.album.name}
                                    <iframe style={{borderRadius:12}} src={`https://open.spotify.com/embed/track/${key.id}?utm_source=generator&theme=0`}width="100%" height="152"  allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                                </li>
                            ))}
                            </ol>
                        </div>
                    </div>
                    : 
                    ""
            }

        </div>
    )
}

export default ArtistPage;