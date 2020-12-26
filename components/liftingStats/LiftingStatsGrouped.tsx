import { Box, Flex } from '@chakra-ui/core';
import moment from 'moment';
import React from 'react';
import { ILiftingStat, ILiftingStatGrouped } from '../../interfaces/liftingStats';
import { PbStack } from '../common/Stacks';
import { HeadingMd, TextSm } from '../common/Texts';

interface IGroupedProps {
  liftingStats: ILiftingStatGrouped[];
}

const LiftingStatGrouped: React.FC<IGroupedProps> = ({ liftingStats }) => {
  if (liftingStats.length <= 0) return <Box></Box>;

  return (
    <Box p="1">
      {liftingStats!.map((x, idx) => (
        <Box p="2" key={idx}>
          <HeadingMd p="2">{x.exerciseName!}</HeadingMd>
          {x.liftingStats.map((l) => (
            <LiftingStatSingle liftingStat={l} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

interface ISingleProps {
  liftingStat: ILiftingStat;
}

const LiftingStatSingle: React.FC<ISingleProps> = ({ liftingStat }) => {
  const { repRange, weight, lastUpdated } = liftingStat;

  return (
    <Flex flexDir="row" justifyItems="center" justifyContent="center">
      <PbStack>
        <TextSm>{repRange}RM</TextSm>
        <TextSm>{weight ?? 'N/A'}kg</TextSm>
        <TextSm>{moment(lastUpdated).format('DD/MM/YY') ?? 'Not Set'}</TextSm>
      </PbStack>
    </Flex>
  );
};

export default LiftingStatGrouped;
