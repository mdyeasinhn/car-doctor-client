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
    }, []);

    const handleDelete = id => {
        const proceed = Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });
        if (proceed) {
            fetch(`http://localhost:5000/bookings/${id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount> 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        const remaining = bookings.filter(bookings => bookings._id !==id)
                        setBookings(remaining)
                    }
                })
        }
    }
    return (
        <div>
            <h2 className="text-3xl"> Your bookings : {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
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
                            bookings.map(booking => <BookingRow key={booking._id} handleDelete={handleDelete} booking={booking}></BookingRow>)
                        }




                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;