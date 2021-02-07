import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import LiftingStatGrouped from './LiftingStatsGrouped';
import { ILiftingStatGrouped } from 'powerbuddy-shared';

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
