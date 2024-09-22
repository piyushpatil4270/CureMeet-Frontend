import React from 'react';
import { Oval } from 'react-loader-spinner';

const MyLoader = () => {
  return (
    <div className='py-2'>
    <Oval
      height={80}
      width={80}
      color="#808080"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#ffffff"
      strokeWidth={2}
      strokeWidthSecondary={2}
      
    />
    </div>
  );
};

export default MyLoader;