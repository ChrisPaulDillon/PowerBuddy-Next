import React from 'react';
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/react';
import { BiDumbbell, FaTrophy, FcCalendar } from 'react-icons/all';
import { TextSm, TextXs } from '../common/Texts';
import { SizeType } from '../../types/unionTypes';

interface ITagProps {
  body: string;
  size?: SizeType;
}

export const TagPersonalBest: React.FC<ITagProps> = ({ body, size }) => (
  <Tag variant="solid" borderRadius="full" colorScheme="red" size={size ?? 'md'}>
    {' '}
    <TagLeftIcon boxSize="12px" as={FaTrophy} />
    <TagLabel>
      <TextXs>{body}</TextXs>
    </TagLabel>
  </Tag>
);

export const TagProgramLogsCount: React.FC<ITagProps> = ({ body, size }) => (
  <Tag variant="solid" borderRadius="full" colorScheme="teal" size={size ?? 'md'}>
    {' '}
    <TagLeftIcon boxSize="12px" as={FcCalendar} />
    <TagLabel>
      <TextXs>{body}</TextXs>
    </TagLabel>
  </Tag>
);

export const TagProgramWeeksCount: React.FC<ITagProps> = ({ body, size }) => (
  <Tag variant="solid" borderRadius="full" colorScheme="purple" size={size ?? 'md'}>
    {' '}
    <TagLeftIcon boxSize="12px" as={FcCalendar} />
    <TagLabel>
      <TextXs>{body}</TextXs>
    </TagLabel>
  </Tag>
);

export const TagProgramDaysCount: React.FC<ITagProps> = ({ body, size }) => (
  <Tag variant="solid" borderRadius="full" colorScheme="blue" size={size ?? 'md'}>
    {' '}
    <TagLeftIcon boxSize="12px" as={FcCalendar} />
    <TagLabel>
      <TextXs>{body}</TextXs>
    </TagLabel>
  </Tag>
);

export const TagExerciseCount: React.FC<ITagProps> = ({ body, size }) => (
  <Tag variant="solid" borderRadius="full" colorScheme="red" size={size ?? 'md'}>
    {' '}
    <TagLeftIcon boxSize="12px" as={BiDumbbell} />
    <TagLabel>
      <TextXs>{body}</TextXs>
    </TagLabel>
  </Tag>
);

export const TagTemplateRepScheme: React.FC<ITagProps> = ({ body, size }) => (
  <Tag variant="solid" borderRadius="full" colorScheme="red" size={size ?? 'md'} minW="90px">
    {' '}
    <TagLeftIcon boxSize="12px" as={BiDumbbell} />
    <TagLabel>
      <TextSm>{body}</TextSm>
    </TagLabel>
  </Tag>
);

export const TagWeekNo: React.FC<ITagProps> = ({ body, size }) => (
  <Tag variant="solid" borderRadius="full" colorScheme="purple" size={size ?? 'md'}>
    {' '}
    <TagLeftIcon boxSize="12px" as={FcCalendar} />
    <TagLabel>
      <TextXs>{body}</TextXs>
    </TagLabel>
  </Tag>
);
