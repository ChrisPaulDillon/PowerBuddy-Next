import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { TextSm } from '../common/Texts';
import moment from 'moment';
import { formatDate } from '../../util/dateHelper';
import { MdDeleteForever } from 'react-icons/md';
import TTIconButton from '../common/IconButtons';
import Axios from 'axios';
import { DeleteLiftingStatAuditUrl } from '../../api/account/liftingStats';
import { ILiftFeed } from 'powerbuddy-shared';
import { ToastSuccess } from '../shared/Toasts';
import { Box, Flex } from '../../chakra/Layout';
import { Link } from '../../chakra/Forms';

interface IProps {
  liftFeed: ILiftFeed[];
}

const LiftFeed: React.FC<IProps> = ({ liftFeed }) => {
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
  const { repRange, dateChanged, weight, exerciseName, exerciseId, liftingStatAuditId } = liftFeed;

  const toast = useToast();

  const deletePersonalBestAudit = async () => {
    setLoading(true);
    try {
      await Axios.delete(DeleteLiftingStatAuditUrl(liftingStatAuditId));
      toast(ToastSuccess('Success', 'Successfully Deleted Personal Best'));
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
        <Link href={`/personalBests/${exerciseId}`} color="teal.500">
          {exerciseName}
        </Link>{' '}
        {moment(formatDate(dateChanged)).isSame(new Date(), 'day') ? '' : 'on'} {formatDate(dateChanged)}!
        <TTIconButton
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
