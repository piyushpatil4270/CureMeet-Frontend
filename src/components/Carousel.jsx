import React, { useState } from 'react';

const Carousel = () => {
  // State to track the current slide index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of healthcare-related image URLs
  const images = [
    "https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723075200&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723075200&semt=ais_hybrid",
    "https://img.freepik.com/free-photo/medical-banner-with-stethoscope_23-2149611199.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1723075200&semt=ais_hybrid"
  ];

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className='w-[50%] h-[50%] flex items-center justify-center '>
      <div className='relative w-full max-w-3xl mx-auto overflow-hidden'>
        <div className='flex transition-transform duration-500 ease-in-out' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((src, index) => (
            <div key={index} className='flex-shrink-0 w-full'>
              <img src={src} alt={`Healthcare ${index + 1}`} className='h-full w-full object-cover' />
            </div>
          ))}
        </div>
        <div className='absolute inset-0 flex items-center justify-between px-4'>
          <button onClick={prevSlide} className='bg-gray-800 text-white p-2 rounded-full'>
            &lt;
          </button>
          <button onClick={nextSlide} className='bg-gray-800 text-white p-2 rounded-full'>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
