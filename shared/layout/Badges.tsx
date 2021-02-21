import { Badge } from '@chakra-ui/react';
import React from 'react';

interface IBadgeProps {
  body: string;
}

export const BadgeCompleted = () => {
  return <Badge colorScheme="green">Completed</Badge>;
};

export const BadgeInProgress = () => {
  return <Badge colorScheme="yellow">In Progress</Badge>;
};

export const BadgeIncomplete = () => {
  return <Badge colorScheme="yellow">Incomplete</Badge>;
};

export const BadgeWorkoutName: React.FC<IBadgeProps> = ({ body }) => {
  return <Badge colorScheme="red">{body}</Badge>;
};

export const BadgeWeekNo: React.FC<IBadgeProps> = ({ body }) => {
  return <Badge colorScheme="blue">{body}</Badge>;
};
