import React, { forwardRef } from 'react';
import { Select } from '@chakra-ui/core';
import { IExercise } from '../../../interfaces/exercises/index';
import { RepSchemeTypeEnum } from '../enums/index';

interface ExerciseProps {
  name: string;
  exercises: IExercise[];
  ref: any;
}

export const ExerciseSelect: React.FC<ExerciseProps> = forwardRef(({ exercises, name }, ref: any) => (
  <Select size="sm" name={name} w="70%" ref={ref}>
    {exercises.map((e) => {
      return (
        <option key={e.exerciseId} value={e.exerciseName}>
          {e.exerciseName}
        </option>
      );
    })}
  </Select>
));

interface IFormProps {
  name: string;
  ref: any;
}

export const RepRangeSelect: React.FC<IFormProps> = forwardRef(({ name }, ref: any) => (
  <Select placeholder="Select" size="sm" name={name} ref={ref} w="75%">
    <option value={1}>1</option>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
    <option value={6}>6</option>
    <option value={7}>7</option>
    <option value={8}>8</option>
    <option value={9}>9</option>
    <option value={10}>10</option>
    <option value={11}>11</option>
    <option value={12}>12</option>
    <option value={13}>13</option>
    <option value={14}>14</option>
    <option value={15}>15</option>
    <option value={16}>16</option>
    <option value={17}>17</option>
    <option value={18}>18</option>
    <option value={19}>19</option>
    <option value={20}>20</option>
  </Select>
));

export const RepSchemeFormatSelect: React.FC<IFormProps> = forwardRef(({ name }, ref: any) => (
  <Select placeholder="Select" size="sm" name={name} ref={ref} w="75%">
    <option value={RepSchemeTypeEnum.FIXED}>Fixed</option>
    <option value={RepSchemeTypeEnum.RAMPED}>Ramped</option>
  </Select>
));
