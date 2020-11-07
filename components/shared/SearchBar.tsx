import React, { useState } from 'react';
import { Input } from '@chakra-ui/core';

interface IProps {
  onChange: (e: any) => void;
  placeholder?: string;
}

const SearchBar: React.FC<IProps> = ({ onChange, placeholder }) => {
  return <Input onChange={onChange} w={['70%', '60%', '50%', '40%']} placeholder={placeholder} variant="flushed" />;
};

export default SearchBar;
