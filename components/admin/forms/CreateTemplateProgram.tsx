import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Flex, Select } from '@chakra-ui/react';
import { CenterColumnFlex, CenterRowFlex } from '../../layout/Flexes';
import { FormInput } from '../../common/Inputs';
import { TextSm, TextXs } from '../../common/Texts';
import { PrimaryButton } from '../../common/Buttons';
import { staticNumberList } from '../../common/static';
import { useSelector } from 'react-redux';
import { IAppState } from '../../../redux/store';
import { validateInput } from '../../../util/formInputs';
import { ITemplateProgram, ITemplateWeek } from 'powerbuddy-shared/lib';
import ITemplateExercise from 'powerbuddy-shared/lib/interfaces/templates';
import { Box } from '../../../chakra/Layout';

const CreateTemplateProgram = () => {
  const [noOfWeeks, setNoOfWeeks] = useState<number>(0);
  const [templateProgram, setTemplateProgram] = useState<ITemplateProgram>({} as ITemplateProgram);

  const { register, handleSubmit, control } = useForm();
  const onSubmit = () => {};

  const updateNoOfweeks = (e) => {
    if (e && e.target && e.target.value) {
      setTemplateProgram({ ...templateProgram, noOfWeeks: parseInt(e.target.value) });
      setNoOfWeeks(parseInt(e.target.value));
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CenterColumnFlex>
          <TextSm>Create a new Template Program</TextSm>
          <Box p="1">
            <FormInput ref={register} name="templateName" placeholder="Enter template name..." />
          </Box>
          <Box p="1" mt="1">
            <Select
              placeholder="No Of Weeks..."
              ref={register({ validate: validateInput })}
              name="noOfWeeks"
              size="sm"
              onChange={(e) => updateNoOfweeks(e)}>
              {staticNumberList.map((x, idx) => (
                <option value={x.value} key={idx}>
                  {x.label}
                </option>
              ))}
            </Select>
          </Box>
        </CenterColumnFlex>

        {Array.from({ length: noOfWeeks }, (_, i) => (
          <TemplateWeekInput control={control} weekNo={++i} />
        ))}

        <Flex p="1" mt="1" justifyContent="center">
          <PrimaryButton type="submit">Create</PrimaryButton>
        </Flex>
      </form>
    </Box>
  );
};

interface IWeekProps {
  control: any;
  weekNo: number;
}

const TemplateWeekInput: React.FC<IWeekProps> = ({ control, weekNo }) => {
  const [noOfDays, setNoOfDays] = useState<number>(0);
  const [] = useState<ITemplateWeek>({} as ITemplateWeek);

  return (
    <Box>
      <Flex flexDir="column">
        <TextXs>Week {weekNo}</TextXs>
        <Box p="1" mt="1">
          <Select placeholder="No Of Days..." size="sm" onChange={(e) => setNoOfDays(parseInt(e.target.value))}>
            {staticNumberList.map((x, idx) => (
              <option value={x.value} key={idx}>
                {x.label}
              </option>
            ))}
          </Select>
        </Box>
      </Flex>
      <CenterRowFlex>
        {Array.from({ length: noOfDays }, (_, i) => (
          <TemplateDayInput control={control} dayNo={++i} />
        ))}
      </CenterRowFlex>
    </Box>
  );
};

interface IDayProps {
  control: any;
  dayNo: number;
}

const TemplateDayInput: React.FC<IDayProps> = ({ control, dayNo }) => {
  const [noOfExercises, setNoOfExercises] = useState<number>(0);

  return (
    <CenterColumnFlex m="4">
      <TextXs>Day {dayNo}</TextXs>
      <Box p="1" mt="1">
        <Select placeholder="No Of Exercises..." size="sm" onChange={(e) => setNoOfExercises(parseInt(e.target.value))}>
          {staticNumberList.map((x, idx) => (
            <option value={x.value} key={idx}>
              {x.label}
            </option>
          ))}
        </Select>
      </Box>
      <CenterRowFlex wrap="no-wrap">
        {' '}
        {Array.from({ length: noOfExercises }, (_, i) => (
          <TemplateExerciseInput control={control} exerciseNo={++i} />
        ))}
      </CenterRowFlex>
    </CenterColumnFlex>
  );
};

interface IExerciseProps {
  control: any;
  exerciseNo: number;
}

const TemplateExerciseInput: React.FC<IExerciseProps> = ({ exerciseNo }) => {
  const [] = useState<ITemplateExercise>({} as ITemplateExercise);
  const { exercises } = useSelector((state: IAppState) => state.state);

  const exerciseList = exercises.map((x) => ({
    value: x.exerciseId,
    label: x.exerciseName,
  }));

  return (
    <CenterColumnFlex wrap="no-wrap" m="4">
      <TextXs>Exercise {exerciseNo}</TextXs>
      <Box p="1" mt="1">
        {' '}
        <TextXs>Exercise</TextXs>
        <Select placeholder="Select..." maxW={150}>
          {exerciseList.map((x, idx) => (
            <option value={x.value} key={idx}>
              {x.label}
            </option>
          ))}
        </Select>
      </Box>
    </CenterColumnFlex>
  );
};

export default CreateTemplateProgram;
