import { useColorMode } from '@chakra-ui/react';
import React from 'react';
import AsyncSelect from 'react-select';
import makeAnimated from 'react-select/animated';
import { getColor } from '../../theme';
import theme from '../../theme';

const animatedComponents = makeAnimated();

export interface ISelectProps {
  options?: any;
  defaultValue?: any;
  onChange?: any;
  onInputChange?: any;
  loadOptions?: any;
  label?: string;
  value?: string;
  defaultOptions?: boolean;
}

export const SelectSearchable: React.FC<ISelectProps> = ({
  options,
  defaultValue,
  onChange,
  onInputChange,
  loadOptions,
  label,
  value,
  defaultOptions,
}) => {
  const { colorMode } = useColorMode();
  // custom style for
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      paddingLeft: 6,
      border: colorMode === 'light' ? `1px solid inherit` : 0,
      borderRadius: 0,
      backgroundColor: getColor(theme.colors.selectColorTemp[colorMode]),
      color: getColor(theme.colors.textColor[colorMode]),
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? getColor(theme.colors.hoverSelectColor[colorMode]) : getColor(theme.colors.selectColor[colorMode]),
        color: isFocused ? getColor(theme.colors.selectColor[colorMode]) : getColor(theme.colors.textColor[colorMode]),
      };
    },
  };

  return (
    <AsyncSelect
      cacheOptions
      components={animatedComponents}
      defaultValue={defaultValue}
      options={options}
      onChange={onChange}
      onInputChange={onInputChange}
      loadOptions={loadOptions}
      styles={colourStyles}
      labelKey={label}
      value={value}
      defaultOptions={defaultOptions}
    />
  );
};
