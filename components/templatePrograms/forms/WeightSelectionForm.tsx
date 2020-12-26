import React from 'react';
import { Box } from '@chakra-ui/core';
import { TextSm, TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';
import { FormInput, FormNumberInput, FormWeightInput } from '../../common/Inputs';
import { PbStack } from '../../common/Stacks';
import { IWeightInput } from '../interfaces';

interface IProps {
  weightProgressionType: string;
  weightInput: IWeightInput[];
  updateWeightInput: (exerciseId: number, weight: number) => void;
}

const WeightSelectionForm: React.FC<IProps> = ({ weightProgressionType, weightInput, updateWeightInput }) => {
  return (
    <CenterColumnFlex>
      {weightProgressionType === 'PERCENTAGE' ? (
        <Box>
          {weightInput.map((x, idx) => (
            <PbStack key={idx}>
              <TextSm>{x.exerciseName}</TextSm>
              <FormWeightInput
                name={x.exerciseId!.toString()}
                defaultValue={x.weight ?? 0}
                maxW="100px"
                onChange={(e: number) => updateWeightInput(x.exerciseId, e)}
              />
              kg
            </PbStack>
          ))}
          <TextXs mt="3">Enter the weights you want the initial percentages to be based off</TextXs>
        </Box>
      ) : (
        <Box>
          {weightInput.map((x, idx) => (
            <PbStack key={idx}>
              <TextSm>{x.exerciseName}</TextSm>
              <FormWeightInput
                name={x.exerciseId!.toString()}
                defaultValue={x.weight ?? 0}
                maxW="100px"
                onChange={(e: number) => updateWeightInput(x.exerciseId, e)}
              />
              kg
            </PbStack>
          ))}
          <TextXs>
            This program is incremental based, meaning percentages are not used to determine start weights, please select your starting weights
          </TextXs>
        </Box>
      )}
    </CenterColumnFlex>
  );
};

export default WeightSelectionForm;
