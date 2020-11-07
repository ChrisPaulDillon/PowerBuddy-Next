import React from 'react';
import { PbModalDrawerForm } from '../../common/ModalDrawer';
import AddDayNoteAlert from '../forms/AddDayNoteForm';
import AddExerciseAlert from '../forms/AddExerciseForm';

export enum DayModalEnum {
  AddExercise,
  AddNotes,
  None,
}

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: DayModalEnum;
  programLogDayId: number;
  comment: string;
}

const ProgramLogDayModalFactory: React.FC<IProps> = ({ isOpen, onClose, modalType, programLogDayId, comment }) => {
  return (
    <PbModalDrawerForm title="" isOpen={isOpen} onClose={onClose}>
      {
        {
          [DayModalEnum.AddExercise]: <AddExerciseAlert onClose={onClose} programLogDayId={programLogDayId!} />,
          [DayModalEnum.AddNotes]: <AddDayNoteAlert onClose={onClose} programLogDayId={programLogDayId!} note={comment!} />,
          //   [ModalType.PersonalBest]: (
          //     <NotifiyPersonalBestAlert setPersonalBests={setPersonalBests} personalBests={personalBests} />
          //   ),
          [DayModalEnum.None]: <></>,
        }[modalType]
      }
    </PbModalDrawerForm>
  );
};

export default ProgramLogDayModalFactory;
