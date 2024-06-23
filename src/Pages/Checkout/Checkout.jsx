import { useLoaderData } from "react-router-dom";


const Checkout = () => {
  const service = useLoaderData();
  const { title, _id } = service;

  return (
    <div>
      <h1>book service: {title}</h1>
      <form >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
          </div>

        </div>
      </form>
    </div>
  );
};

export default Checkout;