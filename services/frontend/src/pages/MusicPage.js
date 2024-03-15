import axios from "axios";

import { useState, useEffect } from "react";

import useUser from "../hooks/useUser";

import MusicList from "../components/MusicList";

const MusicListPage = () => {
    const [musicList, setMusicList] = useState();
    const { user, isLoading } = useUser();

    useEffect(() => {

        const loadMusicList = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const response = await axios.get(`/api/music/search/deftones`, {
                headers,
            });
            const musicList = response;

            setMusicList(musicList.data);
            music_list(musicList.data)
        }
        if (isLoading) {
            loadMusicList();
        }
    }, [])

    function music_list(list) {
        if (!list) {
            return <h1>Loading...</h1>
        }
        else {
            var list_items = list.artists.items

            // return <h1>Success!</h1>
            return <MusicList list_items={list_items} />
        }
    }
    /*
    https://blog.logrocket.com/create-search-bar-react-from-scratch/
    */
    return (
        <div className="container">
            <h1>Music Page</h1>
            <div>
                <input placeholder="Enter Music Search Term"/>
            </div>
            <div>
                {
                    user ?
                        setMusicList ? music_list(musicList) : <h3>Loading...</h3>
                        :
                        <p>You must be logged in to view this page</p>
                }
            </div>

        </div>
    )
}

export default MusicListPage;