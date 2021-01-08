import React, { useState } from 'react';
import { Flex, Box, Link, useToast } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/store';
import { TextSm } from '../common/Texts';
import moment from 'moment';
import { formatDate } from '../../util/dateHelper';
import { MdDeleteForever } from 'react-icons/md';
import PbIconButton from '../common/IconButtons';
import Axios from 'axios';
import { DeleteLiftingStatAuditUrl } from '../../api/account/liftingStats';
import { ILiftFeed } from 'powerbuddy-shared';

interface IProps {
  liftFeed: ILiftFeed[];
}

const LiftFeed: React.FC<IProps> = ({ liftFeed }) => {
  const { user } = useSelector((state: IAppState) => state.state);

  return (
    <Flex flexDir="column" flexWrap="wrap" justifyContent="center" alignItems="center" p="4" w="100%">
      {liftFeed.map((x, idx) => (
        <Box key={idx}>
          <LiftFeedSingle liftFeed={x} />
        </Box>
      ))}
    </Flex>
  );
};

interface ILiftFeedSingleProps {
  liftFeed: ILiftFeed;
}

const LiftFeedSingle: React.FC<ILiftFeedSingleProps> = ({ liftFeed }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { repRange, userName, dateChanged, weight, exerciseName, liftingStatId, exerciseId, liftingStatAuditId } = liftFeed;

  const toast = useToast();
  const onClick = () => `/personalBests/${exerciseId}`;

  const deletePersonalBestAudit = async () => {
    setLoading(true);
    try {
      await Axios.delete(DeleteLiftingStatAuditUrl(liftingStatAuditId));
      toast({
        title: 'Success',
        description: 'Successfully Deleted Personal Best',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not create Personal Best, something has went wrong',
        status: 'error',
        duration: 2000,
        isClosable: true,
        position: 'top-right',
      });
    }
    setLoading(false);
  };

  return (
    <Box p="2">
      <TextSm>
        {repRange}RM achieved at {weight}kg on{' '}
        <Link to={onClick} color="teal.500">
          {exerciseName}
        </Link>{' '}
        {moment(formatDate(dateChanged)).isSame(new Date(), 'day') ? '' : 'on'} {formatDate(dateChanged)}!
        <PbIconButton
          label="Delete Personal Best"
          Icon={MdDeleteForever}
          color="red.500"
          fontSize="20px"
          onClick={deletePersonalBestAudit}
          isLoading={loading}
        />
      </TextSm>
    </Box>
  );
};

export default LiftFeed;
