import React from 'react';
import { Flex } from '../../../chakra/Layout';
import { FormInput } from '../../common/Inputs';
import { TextXs } from '../../common/Texts';

interface IProps {
  setCustomName: (e: any) => void;
  startDate: Date | undefined;
  endDate: Date | undefined;
  templateName?: string;
}

const ProgramSummary: React.FC<IProps> = ({ setCustomName, startDate, endDate }) => {
  return (
    <Flex>
      <TextXs>Name Your Program</TextXs>
      <FormInput name="customName" defaultValue="Custom Template" onChange={(e: { target: { value: any } }) => setCustomName(e.target.value)} />
      {/* <TextXs>Starts on {startDate}</TextXs> */}
      {/* <TextXs>Finishes on {endDate}</TextXs> */}
    </Flex>
  );
};

export default ProgramSummary;
