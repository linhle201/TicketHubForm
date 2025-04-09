import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import './App.css';

const TicketForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      // Convert concertId and quantity to numbers before sending
      const formattedData = {
        ...data,
        concertId: Number(data.concertId),
        quantity: Number(data.quantity),
      };

      // Make sure to log the formattedData for debugging
      console.log('Formatted Data:', formattedData);

      // Making the POST request to the API (using a CORS proxy)
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ticketHub`, 
        formattedData, 
        {
          headers: {
            'Content-Type': 'application/json', 
          },
        }
      );

      if (response.status === 200) {
        console.log("API Response:", response.data);

        // Display success message
        toast.success('Purchase successful!');
        reset();
      } else {
        toast.error('Failed to process the purchase. Please try again.');
      }
    } catch (error) {
      console.error("Error occurred during API call:", error);
      toast.error('There was an error submitting the form.');
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100 bg-black">
        {/* Left side: Form Section */}
        <div className="col-md-6 d-flex flex-column" style={{ height: '110vh' }}>
          <div className="text-center" style={{ width: '100%' }}>
            <h1 className="display-4 fw-semibold mt-3" style={{ color: '#eeb7d1' }}>
              World Tour Ticket Form
            </h1>
            <img 
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/87dfcb88-752d-4f09-98b4-e1b21a0bc61c/dclubsd-f51548d2-a3bc-4fca-b898-bbc197fc8ddf.png"
              alt="World Tour Concert"
              style={{ width: '80%', height: '300px', marginBottom: '2px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            />
           <p className="text-white">             
            BLACKPINK takes the stage for their World Tour! BLACKPINK is bringing their high-energy performances and mesmerizing choreography to iconic venues around the globe. 
            This is an event you won't want to miss. Grab your tickets now! <br></br>
            <strong>Saturday</strong> March 18, 2023</p>
          </div>
          
          {/* Form Container with Flexbox */}
          <div className="form-container p-4" style={{ flex: 1, overflowY: 'auto' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                <div className="col-12 col-md-4">
                  {/* Concert ID */}
                  <div>
                    <label htmlFor="concertId">Concert ID</label>
                    <input
                      type="number"
                      name="concertId"
                      defaultValue={669115646}
                      readOnly
                      {...register('concertId')}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      {...register('email', { 
                        required: 'Email is required', 
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format' }
                      })} 
                    />
                    {errors.email && <span>{errors.email.message}</span>}
                  </div>

                  {/* Name */}
                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      {...register('phone', { 
                        required: 'Phone is required', 
                        pattern: { value: /^\d{10}$/, message: 'Phone number must be 10 digits' }
                      })} 
                    />
                    {errors.phone && <span>{errors.phone.message}</span>}
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  
                  {/* Credit Card */}
                  <div>
                    <label htmlFor="creditCard">Credit Card</label>
                    <input
                      type="text"
                      name="creditCard"
                      {...register('creditCard', { 
                        required: 'Credit card number is required', 
                        pattern: { value: /^\d{16}$/, message: 'Credit card number must be 16 digits' }
                      })} 
                    />
                    {errors.creditCard && <span>{errors.creditCard.message}</span>}
                  </div>

                  {/* Expiration */}
                  <div>
                    <label htmlFor="expiration">Expiration (MM/YY)</label>
                    <input
                      type="text"
                      name="expiration"
                      {...register('expiration', { 
                        required: 'Expiration date is required', 
                        pattern: { value: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Invalid expiration date format. Use MM/YY' }
                      })} 
                    />
                    {errors.expiration && <span>{errors.expiration.message}</span>}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      {...register('quantity', { 
                        required: 'Quantity is required', 
                        min: { value: 1, message: 'Quantity must be at least 1' }
                      })} 
                    />
                    {errors.quantity && <span>{errors.quantity.message}</span>}
                  </div>

                  {/* Security Code (CVV) */}
                  <div>
                    <label htmlFor="securityCode">Security Code (CVV)</label>
                    <input
                      type="text"
                      name="securityCode"
                      {...register('securityCode', { 
                        required: 'Security code is required', 
                        pattern: { value: /^\d{3}$/, message: 'Security code must be 3 digits' }
                      })} 
                    />
                    {errors.securityCode && <span>{errors.securityCode.message}</span>}
                  </div>
                </div>
                <div className="col-12 col-md-4">

                  {/* Address */}
                  <div>
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && <span>{errors.address.message}</span>}
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      {...register('city', { required: 'City is required' })}
                    />
                    {errors.city && <span>{errors.city.message}</span>}
                  </div>

                  {/* Province */}
                  <div>
                    <label htmlFor="province">Province</label>
                    <input
                      type="text"
                      name="province"
                      {...register('province', { required: 'Province is required' })}
                    />
                    {errors.province && <span>{errors.province.message}</span>}
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      type="text"
                      name="postalCode"
                      {...register('postalCode', { 
                        required: 'Postal code is required', 
                        pattern: { value: /(^\d{5}(-\d{4})?$)|(^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$)/, message: 'Invalid postal code format' }
                      })} 
                    />
                    {errors.postalCode && <span>{errors.postalCode.message}</span>}
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      name="country"
                      {...register('country', { required: 'Country is required' })}
                    />
                    {errors.country && <span>{errors.country.message}</span>}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>

        {/* Right Side: Concert Image */}
        <div className="col-md-6 bg-cover d-none d-md-block" style={{ backgroundImage: "url('https://res.klook.com/image/upload/v1673236312/v2rfb2znqw8ktmprsczd.jpg')" }}></div>
      </div>
    </div>
  );
};

export default TicketForm;
