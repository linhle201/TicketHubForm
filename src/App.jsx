import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import  './App.css';

const TicketForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/ticketHub`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // Display success message
      toast.success('Purchase successful!');
      reset(); // Reset the form after successful submission
    } catch (error) {
      // Display error message
      toast.error('There was an error submitting the form.');
    }
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-md-5 d-flex align-items-center bg-black justify-content-center text-white p-4" >
          <div className="form-container w-100">
            <h1 className="display-4 fw-semibold" style={{color: '#f34a8e' }}>World Tour Ticket Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row">
                {/* First Row: Form */}
                <div className="col-md-6">
                  <div>
                    <label htmlFor="concertId">Concert ID</label>
                    <input
                      type="number"
                      name="concertId"
                      value="669115646"
                      readOnly
                      {...register('concertId')}
                    />
                  </div>

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

                  <div>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      name="name"
                      {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <span>{errors.name.message}</span>}
                  </div>

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

                {/* Second Row: Payment and Address Information */}
                <div className="col-md-6">
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

                  <div>
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      name="address"
                      {...register('address', { required: 'Address is required' })}
                    />
                    {errors.address && <span>{errors.address.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      name="city"
                      {...register('city', { required: 'City is required' })}
                    />
                    {errors.city && <span>{errors.city.message}</span>}
                  </div>

                  <div>
                    <label htmlFor="province">Province</label>
                    <input
                      type="text"
                      name="province"
                      {...register('province', { required: 'Province is required' })}
                    />
                    {errors.province && <span>{errors.province.message}</span>}
                  </div>

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

              <button type="submit">Submit</button>
            </form>
              </div>
              </div>
        {/* Right Column: Image */}
        <div className="col-md-7 bg-cover d-none d-md-block" style={{ backgroundImage: "url('https://res.klook.com/image/upload/v1673236312/v2rfb2znqw8ktmprsczd.jpg')" }}>
        </div>
      </div>
    </div>
   
  );
}

export default TicketForm;