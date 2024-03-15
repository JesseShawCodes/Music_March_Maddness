import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const createAccount = async () => {
        console.log("CREATE ACCONUT")
        try {
            if (password !== confirmPassword) {
                console.log("RE-ENTER PASSWORD")
                setError("Passwords do no match");
                return;
            }

            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles')
        } catch (e) {
            setError(e.messages);
        }
    }

    return (
        <div className="login_page">
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}

            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Confirm Password</label>
                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Re-enter password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="current-password"/>
            </div>
            <div>
                <button onClick={createAccount} className="btn btn-primary">Create Account</button>
            </div>
            <div>
                <Link to="/login">Already have an account? Click Here</Link>
            </div>
        </div>
    )
}

export default CreateAccountPage;