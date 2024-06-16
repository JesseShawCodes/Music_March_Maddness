const Albums = ({ list_items }) => {
    return (
        <div className="albums_container" style={{maxWidth: '100%'}}>
        {list_items.map((key, index) => (
            <div className="card" style={{ maxWidth: '100%'}} key={index}>
            <img className="card-img-top" src={key.images[1].url} alt={`${key.name} album cover`} style={{maxWidth: '200px'}}/>
            <div className="card-body">
                <h3 className="card-title">{key.name}</h3>
                <h4>{key.id}</h4>
                <h4>{key.popularity}</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <button href="#" className="btn btn-primary">Go somewhere</button>
            </div>
            </div>
        ))}
        </div>
    )
}

export default Albums;