import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Box, RadioGroup, Radio, IconButton } from '@chakra-ui/core';
import { TextSm, ITextSm } from '../common/Texts';
import { PbStack } from '../common/Stacks';
import { GiMale, GiFemale, GiHelicopter } from 'react-icons/gi';
import { CenterColumnFlex } from '../layout/Flexes';
import { TextXs } from '../common/Texts';
import axios from 'axios';
import { CreateFirstVisitStatsUrl } from '../../api/account/user';

interface IProps {
  onClose: () => void;
}

const FirstVisitAlert: React.FC<IProps> = ({ onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maleSelected, setMaleSelected] = useState<boolean>(false);
  const [femaleSelected, setFemaleSelected] = useState<boolean>(false);
  const [bottomNote, setBottomNote] = useState<string>('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    if (currentPage < 4) {
      return;
    } else {
      data.genderId = maleSelected ? 3 : 2;
      try {
        await axios.post(CreateFirstVisitStatsUrl(), data);
      } catch (err) {}
      onClose();
    }
    setLoading(false);
  };

  const determinePage = () => {
    if (currentPage === 1) {
      setCurrentPage(currentPage + 1);
      setBottomNote('Note: This can be changed at any time');
    }
    if (currentPage === 2) {
      setCurrentPage(currentPage + 1);
      setBottomNote('');
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleGenderSelection = (gender: string) => {
    if (gender === 'male') {
      setMaleSelected(true);
      setFemaleSelected(false);
    } else {
      setMaleSelected(false);
      setFemaleSelected(true);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextSm display={currentPage === 1 ? 'visible' : 'none'}>
        PowerBuddy was created as a way to create, track and analyze weightlifting progress all in the one place. It's really as simple as putting in
        your current one rep maxes for your main lifts to create a program log, and we'll do the rest. No more mico-mangaging spreadsheets,
        calculating stats such as tonnage manually and tracking personal bests. Leave that to us. Would you like to get started?
      </TextSm>
      <Box display={currentPage === 2 ? 'visible' : 'none'}>
        <TextSm>
          Lets start by asking you how you would describe yourself as a lifter? By telling us your experience, we can taylor initial programs towards
          your skill level.
        </TextSm>
        <CenterColumnFlex>
          <RadioGroup defaultValue="Beginner" spacing={5} isInline ref={register} name="liftinglevel" mt="3">
            <Radio colorScheme="red" value="Beginner" ref={register} p="1">
              <TextXs>Beginner</TextXs>
            </Radio>
            <Radio colorScheme="green" value="Intermediate" ref={register} p="1">
              <TextXs>Intermediate</TextXs>
            </Radio>
            <Radio colorScheme="purple" value="Advanced" ref={register} p="1">
              <TextXs>Advanced</TextXs>
            </Radio>
          </RadioGroup>
        </CenterColumnFlex>
      </Box>
      <Box display={currentPage === 3 ? 'visible' : 'none'}>
        <CenterColumnFlex>
          <TextSm mb={4}>Please Select Your Gender</TextSm>
          <PbStack w="100%">
            <CenterColumnFlex>
              <IconButton
                icon={<GiMale />}
                isRound
                size="lg"
                aria-label=""
                color={maleSelected ? 'green.500' : 'gray.500'}
                onClick={() => handleGenderSelection('male')}></IconButton>
              <TextSm>Male</TextSm>
            </CenterColumnFlex>
            <CenterColumnFlex>
              <IconButton
                icon={<GiFemale />}
                isRound
                size="lg"
                aria-label=""
                color={femaleSelected ? 'green.500' : 'gray.500'}
                onClick={() => handleGenderSelection('female')}></IconButton>
              <TextSm>Female</TextSm>
            </CenterColumnFlex>
          </PbStack>
          <CenterColumnFlex>
            <IconButton icon={<GiHelicopter />} isRound size="lg" aria-label=""></IconButton>
            <TextSm>Attack Helicopter</TextSm>
          </CenterColumnFlex>
        </CenterColumnFlex>
      </Box>
      <CenterColumnFlex mt="2">
        <Button colorScheme="green" ml={3} onClick={() => determinePage()} type="submit" isLoading={loading}>
          {currentPage === 1 ? 'Yes' : 'Continue'}
        </Button>
        <ITextSm mt="2">{bottomNote}</ITextSm>
      </CenterColumnFlex>
    </form>
  );
};

export default FirstVisitAlert;
