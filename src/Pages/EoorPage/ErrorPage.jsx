import { Link } from 'react-router-dom';
import img from '../../assets/images/404 PAGE/404.png';
import Navbar from '../Shared/Navbar/Navbar';

const ErrorPage = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='flex justify-center'>
                <img className='w-[600px]' src={img} alt="" />

            </div>
            <div className='flex justify-center'>
                <Link to='/'><button className='btn text-white bg-[#FF3811]'>Back to Home</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;