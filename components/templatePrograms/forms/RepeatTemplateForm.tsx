import { IWeightInput } from 'powerbuddy-shared';
import React, { useState } from 'react';
import { Select, Switch } from '../../../chakra/Forms';
import { Box, Flex } from '../../../chakra/Layout';
import { FormWeightInput } from '../../common/Inputs';
import { PbStack } from '../../common/Stacks';
import { staticNumberList } from '../../common/static';
import { TextSm, TextXs } from '../../common/Texts';
import { CenterColumnFlex } from '../../layout/Flexes';

interface IProps {
  incrementalWeightInput: IWeightInput[];
  updateIncrementalWeightInput: (exerciseId: number, weight: number) => void;
  updateRepeatProgramCount: (e: any) => void;
}

const RepeatTemplateForm: React.FC<IProps> = ({ incrementalWeightInput, updateIncrementalWeightInput, updateRepeatProgramCount }) => {
  const [repeatEnabled, setRepeatEnabled] = useState<boolean>(false);

  return (
    <CenterColumnFlex>
      <Flex>
        <TextSm pr="2">Repeat Program?</TextSm>
        <Switch onChange={() => setRepeatEnabled(!repeatEnabled)} />
      </Flex>
      {repeatEnabled ? (
        <Box>
          <TextXs m="3">I will increase my lifts every cycle by:</TextXs>
          {incrementalWeightInput.map((x, idx) => (
            <PbStack key={idx}>
              <TextSm>{x.exerciseName}</TextSm>
              <FormWeightInput
                name={x.exerciseId!.toString()}
                defaultValue={x.weight ?? 0}
                maxW="100px"
                onChange={(e) => updateIncrementalWeightInput(x.exerciseId, e)}
              />
              kg
            </PbStack>
          ))}
          <PbStack>
            <TextXs mr="1">I want to repeat this program cycle</TextXs>
            <Select
              placeholder="1"
              defaultValue={1}
              name="noOfWeeks"
              size="xs"
              onChange={(e) => updateRepeatProgramCount(parseInt(e.target.value))}
              maxW="50px">
              {staticNumberList.map((x, idx) => (
                <option value={x.value} key={idx}>
                  {x.label}
                </option>
              ))}
            </Select>
            <TextXs ml="1">times </TextXs>
          </PbStack>
        </Box>
      ) : null}
    </CenterColumnFlex>
  );
};

export default RepeatTemplateForm;
