import { Box } from '@chakra-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useShuffleArray } from '../../hooks/useShuffleArray';
import { IQuote } from 'powerbuddy-shared';
import { IAppState } from '../../redux/store';
import { TextQuote, TextAuthorQuote } from '../common/Texts';
import { CenterColumnFlex } from '../layout/Flexes';
import { useUserContext } from '../users/UserContext';

const QuoteDisplay = () => {
  const { quotes } = useSelector((state: IAppState) => state.state);
  //const { user } = useUserContext();
  const quoteOfDayEntry = useShuffleArray(quotes) as IQuote;

  //if (quotes.length <= 0 || !user.quotesEnabled) return <Box></Box>;

  return (
    <CenterColumnFlex py={[2, 3, 2, 1]} mt="1">
      <TextQuote mb="1">"{quoteOfDayEntry.quoteStr ?? ''}"</TextQuote>
      <TextAuthorQuote mb="1">
        - {quoteOfDayEntry.author} {quoteOfDayEntry.year}{' '}
      </TextAuthorQuote>
    </CenterColumnFlex>
  );
};

export default QuoteDisplay;
