import React from 'react';
import { IconButton } from '@chakra-ui/core';
import { PbToolTip } from './ToolTips';
import { IconType } from 'react-icons';

interface IProps {
  label: string;
  Icon: IconType;
  onClick: () => void;
  fontSize?: string;
  color?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const PbIconButton: React.FC<IProps> = ({ label, Icon, onClick, fontSize, color, isDisabled, isLoading, ...rest }) => {
  return (
    <PbToolTip label={label}>
      <IconButton
        aria-label=""
        icon={<Icon />}
        size="sm"
        isRound
        variant="ghost"
        onClick={onClick}
        fontSize={fontSize ?? '20px'}
        color={color}
        isDisabled={isDisabled ?? false}
        isLoading={isLoading ?? false}
        {...rest}
      />
    </PbToolTip>
  );
};

export default PbIconButton;
