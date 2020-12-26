import React from 'react';
import { CenterColumnFlex } from '../../layout/Flexes';
import { PbStack } from '../../common/Stacks';
import { Flex, Checkbox } from '@chakra-ui/core';
import { TextXs, TextSm } from '../../common/Texts';
import moment from 'moment';
import { ITemplateProgram } from '../../../interfaces/templates';

interface IProps {
  selectedDate: Date;
  monChecked: boolean;
  setMonChecked: (val: boolean) => void;
  tueChecked: boolean;
  setTueChecked: (val: boolean) => void;
  wedChecked: boolean;
  setWedChecked: (val: boolean) => void;
  thuChecked: boolean;
  setThuChecked: (val: boolean) => void;
  friChecked: boolean;
  setFriChecked: (val: boolean) => void;
  satChecked: boolean;
  setSatChecked: (val: boolean) => void;
  sunChecked: boolean;
  setSunChecked: (val: boolean) => void;
  noOfDaysPerWeek: number;
}

const DayCheckboxForm: React.FC<IProps> = ({
  selectedDate,
  monChecked,
  setMonChecked,
  tueChecked,
  setTueChecked,
  wedChecked,
  setWedChecked,
  thuChecked,
  setThuChecked,
  friChecked,
  setFriChecked,
  satChecked,
  setSatChecked,
  sunChecked,
  setSunChecked,
  noOfDaysPerWeek,
}) => {
  const dayOfWeek = moment(selectedDate).format('dddd');
  return (
    <CenterColumnFlex>
      <TextSm mb="3">Select which days you will lift</TextSm>
      <PbStack pt="2">
        <Flex>
          <TextXs minW="90px">Monday</TextXs>
          <Checkbox
            name="monday"
            defaultIsChecked={monChecked}
            onChange={() => setMonChecked(!monChecked)}
            isDisabled={dayOfWeek === 'Monday' ? true : false}
          />
        </Flex>
        <Flex>
          <TextXs minW="90px">Tuesday</TextXs>
          <Checkbox
            name="tuesday"
            defaultIsChecked={tueChecked}
            onChange={() => setTueChecked(!tueChecked)}
            isDisabled={dayOfWeek === 'Tuesday' ? true : false}
          />
        </Flex>
      </PbStack>
      <PbStack>
        <Flex>
          <TextXs minW="90px">Wednesday</TextXs>
          <Checkbox
            name="wednesday"
            defaultIsChecked={wedChecked}
            onChange={() => setWedChecked(!wedChecked)}
            isDisabled={dayOfWeek === 'Wednesday' ? true : false}
          />
        </Flex>
        <Flex>
          <TextXs minW="90px">Thursday</TextXs>
          <Checkbox
            name="thursday"
            defaultIsChecked={thuChecked}
            onChange={() => setThuChecked(!thuChecked)}
            isDisabled={dayOfWeek === 'Thursday' ? true : false}
          />
        </Flex>
      </PbStack>
      <PbStack>
        <Flex>
          <TextXs minW="90px">Friday</TextXs>
          <Checkbox
            name="friday"
            defaultIsChecked={friChecked}
            onChange={() => setFriChecked(!friChecked)}
            isDisabled={friChecked && dayOfWeek === 'Friday' ? true : false}
          />
        </Flex>
        <Flex>
          <TextXs minW="90px">Saturday</TextXs>
          <Checkbox
            name="saturday"
            defaultIsChecked={satChecked}
            onChange={() => setSatChecked(!satChecked)}
            isDisabled={dayOfWeek === 'Saturday' ? true : false}
          />
        </Flex>
      </PbStack>
      <PbStack>
        <Flex>
          <TextXs minW="90px">Sunday</TextXs>
          <Checkbox
            name="sunday"
            defaultIsChecked={sunChecked}
            onChange={() => setSunChecked(!sunChecked)}
            isDisabled={dayOfWeek === 'Sunday' ? true : false}
          />
        </Flex>
      </PbStack>
      <TextSm>Please select {noOfDaysPerWeek} Days for this program</TextSm>
    </CenterColumnFlex>
  );
};

export default DayCheckboxForm;
