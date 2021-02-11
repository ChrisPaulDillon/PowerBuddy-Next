import React, { useState } from 'react';
import LiftingStatGrouped from './LiftingStatGrouped';
import { ILiftingStatGrouped } from 'powerbuddy-shared';
import { Flex } from '../../chakra/Layout';

const LiftingStatList = () => {
  const [liftingStats] = useState<ILiftingStatGrouped[]>();
  return (
    <Flex flexDir="column" flexWrap="wrap" justifyContent="center" alignItems="center" p="4" w="100%">
      {liftingStats?.map((e, i) => (
        <LiftingStatGrouped liftingStats={liftingStats} />
      ))}
    </Flex>
  );
};

export default LiftingStatList;
