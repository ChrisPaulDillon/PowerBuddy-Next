import React from 'react';
import { Flex } from '@chakra-ui/core';
import { useLiftingStatContext } from './LiftingStatContext';
import LiftingStatGrouped from './LiftingStatsGrouped';

const LiftingStatList = () => {
  const { liftingStats } = useLiftingStatContext();

  return (
    <Flex flexDir="column" flexWrap="wrap" justifyContent="center" alignItems="center" p="4" w="100%">
      {liftingStats!.map((e, i) => (
        <LiftingStatGrouped liftingStats={liftingStats} />
      ))}
    </Flex>
  );
};

export default LiftingStatList;
