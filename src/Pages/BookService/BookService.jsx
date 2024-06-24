import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from "sweetalert2";


const BookService = () => {
    const service = useLoaderData();
    const { title, _id , price, img} = service;
    const {user} = useContext(AuthContext)
    const handleBookService= e =>{
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking ={
            customerName :name,
            email,
            img,
            date,       
            service: title,
            service_id: _id,
            price: price
        }
        console.log(booking);
        fetch('http://localhost:5000/bookings',{
            method : 'POST',
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(booking)
        })
        .then(res=> res.json())
        .then(data=>{
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: "Service Book successfully ",
                    // text: "That thing is still around?",
                    icon: "success"
                  });
            }
        })
    }
    return (
        <div>
            <h1 className="text-center text-3xl font-bold">Book service: {title}</h1>
            <form onSubmit={handleBookService} className="mb-6" >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="name" name='name'  defaultValue={user?.displayName} placeholder="Name" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name='date' placeholder="Date" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name='email' defaultValue={user?.email} placeholder="email" className="input input-bordered" required />
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" name='' defaultValue={'$'+price} className="input input-bordered" required />
                    </div>
                </div>
                <div className="mt-6">
                    <input className="btn btn-block bg-orange-500" type="submit" value="ORDER CONFIRM" />
                </div>
            </form>
        </div>
    );
};

export default BookService;