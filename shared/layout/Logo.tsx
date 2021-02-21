import React from 'react';
import Image from 'next/image';
import CSS from 'csstype';

const divStyle: CSS.Properties = {
  justifyContent: 'center',
  alignContent: 'center',
};

const Logo = () => {
  return (
    <div
      style={{
        position: 'relative',
        left: '100%',
      }}>
      <Image width="125px" height="125px" src="/logo.png" />
    </div>
  );
};

export default Logo;
