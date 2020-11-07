import React from 'react';
import { Controller } from 'react-hook-form';
import ReactSelect from 'react-select';

interface IProps {
  values: { value: number; label: string }[];
  defaultValue?: { value: number; label: string };
  control?: any;
  name: string;
  onChange?: any;
  w?: any;
}

export const SearchSelect: React.FC<IProps> = ({ values, defaultValue, control, name }) => {
  return (
    <Controller
      as={ReactSelect}
      options={values}
      name={name}
      isClearable
      control={control}
      defaultValue={defaultValue}
    />
  );
};

export const FixedSelect: React.FC<IProps> = ({ values, defaultValue, control, name, onChange }) => {
  return (
    <Controller
      style={{ width: '100%' }}
      as={ReactSelect}
      options={values}
      name={name}
      control={control}
      defaultValue={defaultValue}
      isSearchable={false}
      width="100%"
      onChange={onChange}
    />
  );
};
