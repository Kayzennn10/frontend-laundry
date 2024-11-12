import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "./OurService.css";
import { sliderSettings } from "../../utils/common";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import API from "../../api";

const Residencies = () => {
  const [service, setService] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [size, setSize] = useState(1);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const data = await API.getService();
      setService(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load services");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleServiceClick = (service) => {
    const userEmail = localStorage.getItem('email');
    
    if (!userEmail) {
      navigate('/login');
      return;
    }

    setSelectedService(service);
    setSize(1);
    setShowDialog(true);
  };

  const handleSizeChange = (event) => {
    const value = parseInt(event.target.value) || 1;
    setSize(Math.max(1, value));
  };

  const calculateTotalPrice = () => {
    if (!selectedService) return 0;
    return selectedService.price * size;
  };

  const handleConfirm = async () => {
    if (selectedService) {
      const orderData = {
        serviceId: selectedService.id,
        clientId: localStorage.getItem('id'),
        employeeId: 1,
        size: size,
        totalPrice: calculateTotalPrice()
      };

      try {
        await API.createPayment(orderData);
        console.log("Order data:", orderData);
        setShowDialog(false);
        toast.success("Order successfully created!");
        setTimeout(() => {
        }, 1500);
      } catch (error) {
        console.error("Error creating order:", error);
        toast.error("Failed to create order. Please try again.");
      }
    }
  };

  return (
    <div id="residencies" className="r-wrapper">
      {/* Toast Container */}
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: '#10B981',
              color: 'white',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
        }}
      />

      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Home Service</span>
        </div>
        <Swiper {...sliderSettings}>
          <SlideNextButton />
          {service &&
            service.map((card, i) => (
              <SwiperSlide key={i}>
                <div className="flexColStart r-card">
                  <div 
                    onClick={() => handleServiceClick(card)}
                    className="cursor-pointer"
                  >
                    <img src="./carpetClean.webp" alt="home" />
                  </div>
                  <span className="secondaryText r-price">
                    <span style={{ color: "orange" }}>Rp. </span>
                    <span>{card.price},-</span>
                  </span>
                  <span className="primaryText">{card.name}</span>
                  <span className="secondaryText">{card.description}</span>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        {/* Modal Backdrop */}
        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
              <div className="text-lg font-semibold mb-4">
                {selectedService?.name}
              </div>
              
              <div className="mb-4">
                <div className="text-gray-600">Price per unit:</div>
                <div className="font-medium">Rp. {selectedService?.price},-</div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-2">
                  Enter size (m²):
                </label>
                <input
                  type="number"
                  min="1"
                  value={size}
                  onChange={handleSizeChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-6">
                <div className="text-gray-600">Total Price:</div>
                <div className="text-lg font-semibold">
                  Rp. {calculateTotalPrice().toLocaleString()},-
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowDialog(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Residencies;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};