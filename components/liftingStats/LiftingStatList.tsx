import React, { useState } from 'react';
import { Flex } from '@chakra-ui/core';
import LiftingStatGrouped from './LiftingStatsGrouped';
import { ILiftingStat, ILiftingStatGrouped } from '../../interfaces/liftingStats';

const LiftingStatList = () => {
  const [liftingStats] = useState<ILiftingStatGrouped[]>();
  return (
    <Flex flexDir="column" flexWrap="wrap" justifyContent="center" alignItems="center" p="4" w="100%">
      {liftingStats!.map((e, i) => (
        <LiftingStatGrouped liftingStats={liftingStats} />
      ))}
    </Flex>
  );
};

export default LiftingStatList;
