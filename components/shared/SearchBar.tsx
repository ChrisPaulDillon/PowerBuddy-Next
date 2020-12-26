import React, { useState } from 'react';
import { BoxProps, Input } from '@chakra-ui/core';

interface ISearchBarProps extends BoxProps {
  onChange: (e: any) => void;
  placeholder?: string;
}

const SearchBar: React.FC<ISearchBarProps> = ({ onChange, placeholder }) => {
  return <Input onChange={onChange} placeholder={placeholder} variant="flushed" maxW="300px" />;
};

export default SearchBar;
