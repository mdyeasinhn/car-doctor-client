import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([])
    const uri = `http://localhost:5000/bookings?email=${user?.email}`;

    useEffect(() => {
        fetch(uri)
            .then(res => res.json())
            .then(data => {
                setBookings(data);
            })
    }, [uri]);

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF3811",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`http://localhost:5000/bookings/${id}`, {
                    method: "DELETE",

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your coffee has been deleted.",
                                icon: "success"
                            });
                            const remaining = bookings.filter(bookings => bookings._id !== id)
                            setBookings(remaining)
                        }
                    })

            }
        });

    }


    const handleBookingConfirm = id => {
        fetch(`http://localhost:5000/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    // update state
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = 'confirm'
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);
                }
            })
    }





    return (
        <div>
            <h2 className="text-3xl text-center font-bold"> Your bookings : {bookings.length}</h2>
            <div className="">
                <table className="table">
                    {/* head */}
                    <thead className="">
                        <tr>
                            <th>
                                <label>
                                    {/* <input type="checkbox" className="checkbox" /> */}
                                </label>
                            </th>
                            <th>IMAGE</th>
                            <th>SERVICE</th>
                            <th>DATE</th>
                            <th>PRICE</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow key={booking._id} handleDelete={handleDelete} booking={booking} handleBookingConfirm={handleBookingConfirm}></BookingRow>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;