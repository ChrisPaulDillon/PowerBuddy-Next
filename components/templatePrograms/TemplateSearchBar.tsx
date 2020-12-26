import { useColorMode } from '@chakra-ui/core';
import React, { Component, useState } from 'react';
import { useHistory } from 'react-router';
import AsyncSelect from 'react-select/async';
import { GetTemplatesBySearch } from '../../api/public/template';
import theme, { getColor } from '../../theme';
import RightNav from '../layout/RightMenu';
import { TEMPLATES_URL } from '../util/InternalLinks';

const TemplateSearchBar = () => {
  const [selectedOption, setSelectedOption] = useState<any>('');
  const { colorMode } = useColorMode();
  const history = useHistory();

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      paddingLeft: 6,
      marginRight: 10,
      backgroundColor: getColor(theme.colors.background[colorMode]),
      color: getColor(theme.colors.textColor[colorMode]),
      width: '250px',
    }),
    option: (styles, { isFocused }) => {
      return {
        ...styles,
        backgroundColor: isFocused ? getColor(theme.colors.hoverSelectColor[colorMode]) : getColor(theme.colors.selectColor[colorMode]),
        color: isFocused ? getColor(theme.colors.selectColor[colorMode]) : getColor(theme.colors.textColor[colorMode]),
      };
    },
  };

  const fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        fetch(GetTemplatesBySearch(inputValue), {
          method: 'GET',
        })
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            const tempArray = [];
            data.forEach((element) => {
              //@ts-ignore
              tempArray.push({ label: `${element.templateName}`, value: element.templateProgramId });
            });
            callback(tempArray);
          })
          .catch((error) => {
            console.log(error, 'catch the hoop');
          });
      });
    }
  };

  const onSearchChange = (selectedOption) => {
    if (selectedOption) {
      setSelectedOption(selectedOption);
      history.push(`${TEMPLATES_URL}/${selectedOption.value}`);
    }
  };

  return (
    <div>
      <AsyncSelect
        value={selectedOption}
        loadOptions={fetchData}
        placeholder="Program Search..."
        onChange={(e) => {
          onSearchChange(e);
        }}
        defaultOptions={false}
        styles={colourStyles}
      />
    </div>
  );
};

export default TemplateSearchBar;
