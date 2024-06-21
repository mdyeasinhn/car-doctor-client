import { FaArrowRightLong } from "react-icons/fa6";

const ServiceCard = ({ service }) => {
    const { title, img, price } = service;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={img} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body ">
                <h2 className="card-title text-2xl font-bold">{title}</h2>
                <div className="card-actions">
                    <p className="text-xl text-[#FF3811] font-semibold">Price: ${price} </p>
                    <button className="text-[#FF3811]">
                        <FaArrowRightLong></FaArrowRightLong>
                        
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;