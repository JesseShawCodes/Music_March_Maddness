const TopTracks = ({ list_items }) => {
    return (
        <div className="tracks_container">
            <ol className="list-group list-group-numbered">
                {list_items?.map((key, index) => (
                    <li className="list-group-item" key={index}>
                        {key.name} - {key.album.name}
                        <iframe style={{borderRadius:12}} src={`https://open.spotify.com/embed/track/${key.id}?utm_source=generator&theme=0`}width="100%" height="152"  allowFullScreen="" title={key.album.name} allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </li>
                ))}
            </ol>
        </div>
    )
}

export default TopTracks;