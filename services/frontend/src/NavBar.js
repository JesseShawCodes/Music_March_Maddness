
import { Link, useNavigate } from 'react-router-dom';
import useUser from './hooks/useUser';
import { getAuth, signOut } from 'firebase/auth';
const NavBar = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to="/" className='nav-link active navbar-brand'>Spotify App</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/about" className='nav-link active'>About</Link>
                    </li>

                    <li className='nav-item'>
                        <Link to="/music_search" className='nav-link active'>Music Search</Link>
                    </li>
                </ul>
                <ul className='navbar-nav'>
                    {
                        user ? <li className='nav-item me-auto mb-2 mb-lg-0'>{user.email}</li> : ""
                    }
                    <li className="nav-item">
                        { user
                            ? <button className="btn btn-secondary" onClick={() => {
                                signOut(getAuth())
                            }}>Logout</button>
                            : <button className="btn btn-secondary" onClick={() => {
                                navigate('/login')
                            }}>Login</button>
                        }
                       
                    </li>
                </ul>

                </div>
            </div>
            </nav>
    )
}

export default NavBar;