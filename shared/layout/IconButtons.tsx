import React from 'react';
import { MdDeleteForever } from 'react-icons/md';
import TTIconButton from '../../components/common/IconButtons';

interface IIconButtonProps {
  label: string;
  onClick: () => void;
  isDisabled: boolean;
}

export const TrashIconButton: React.FC<IIconButtonProps> = ({ label, onClick, isDisabled }) => {
  return <TTIconButton label={label} Icon={MdDeleteForever} color="red.500" fontSize="20px" onClick={onClick} isDisabled={isDisabled} />;
};
