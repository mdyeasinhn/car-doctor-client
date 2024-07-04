import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const { signIn } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();

    const handleLoign = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        signIn(email, password)
            .then(res => {
                const loggedInUser = res.user;
                console.log(loggedInUser);
                const user = { email };
                // get access token
                axios.post('http://localhost:5000/jwt', user, { withCredentials: true })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                            navigate(location?.state ? location?.state : '/')
                            toast.success('Successfully created!');
                        }
                    })
            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <div className="mr-12 w-1/2">
                    <img src={img} alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLoign} className="card-body">
                        <h1 className="text-3xl text-center font-bold">Login</h1>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn bg-[#FF3811]" type="submit" value="LOGIN" />
                        </div>
                    </form>
                    <h2 className='my-4 text-center'>New to car Doctors <Link className='text-orange-500 font-bold ' to='/signUp'>Sign Up</Link></h2>
                </div>
            </div>
        </div>
    );
};

export default Login;