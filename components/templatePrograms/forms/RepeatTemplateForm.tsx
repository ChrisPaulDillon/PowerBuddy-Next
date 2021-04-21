import { IWeightInput } from 'powerbuddy-shared';
import React, { useState } from 'react';
import { Select, Switch } from '../../../chakra/Forms';
import { Box, Flex, Stack } from '../../../chakra/Layout';
import { Text } from '../../../chakra/Typography';
import { FormWeightInput } from '../../common/Inputs';
import { PbStack } from '../../common/Stacks';
import { staticNumberList } from '../../common/static';
import { TextSm } from '../../common/Texts';
import { useUserContext } from '../../users/UserContext';

interface IProps {
  incrementalWeightInput: IWeightInput[];
  updateIncrementalWeightInput: (exerciseId: number, weight: number) => void;
  updateRepeatProgramCount: (e: any) => void;
}

const RepeatTemplateForm: React.FC<IProps> = ({ incrementalWeightInput, updateIncrementalWeightInput, updateRepeatProgramCount }) => {
  const [repeatEnabled, setRepeatEnabled] = useState<boolean>(false);
  const { kgOrLbs } = useUserContext();

  return (
    <Box>
      <Flex justify="center">
        <TextSm pr="2">Repeat Program?</TextSm>
        <Switch onChange={() => setRepeatEnabled(!repeatEnabled)} isDisabled />
      </Flex>
      {repeatEnabled && (
        <Box>
          <Text my={4} fontWeight={400} textAlign="center">
            I will increase my lifts every cycle by:
          </Text>
          {incrementalWeightInput.map((x, idx) => (
            <PbStack key={idx}>
              <Text>{x.exerciseName}</Text>
              <FormWeightInput
                name={x.exerciseId!.toString()}
                defaultValue={x.weight ?? 0}
                maxW="100px"
                onChange={(e) => updateIncrementalWeightInput(x.exerciseId, parseInt(e))}
              />
              {kgOrLbs}
            </PbStack>
          ))}
          <Stack isInline justify="center" my={6}>
            <Text mr="1" fontWeight={400}>
              I want to repeat this program cycle
            </Text>
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
            <Text ml="1" fontWeight={400}>
              times{' '}
            </Text>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default RepeatTemplateForm;
