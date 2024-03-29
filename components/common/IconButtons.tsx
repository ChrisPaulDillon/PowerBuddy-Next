import React from 'react';
import { PbToolTip } from './ToolTips';
import { IconType } from 'react-icons';
import { SizeType } from '../../types/unionTypes';
import { Icon, IconButton } from '../../chakra/Forms';

interface IProps {
  label: string;
  Icon: IconType;
  onClick: () => void;
  fontSize?: string;
  color?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  size?: SizeType;
  mt?: number;
}

const TTIconButton: React.FC<IProps> = ({ label, Icon, onClick, fontSize, color, isDisabled, isLoading, size, mt, ...rest }) => {
  return (
    <PbToolTip label={label}>
      <IconButton
        aria-label=""
        icon={<Icon />}
        size={size ?? 'sm'}
        isRound
        variant="ghost"
        onClick={onClick}
        fontSize={fontSize ?? '20px'}
        color={color}
        isDisabled={isDisabled ?? false}
        isLoading={isLoading ?? false}
        mt={mt}
        {...rest}
      />
    </PbToolTip>
  );
};

export const TTIcon = ({ label, ...rest }) => {
  return (
    <PbToolTip label={label}>
      <Icon aria-label="" fontSize="20px" {...rest} />
    </PbToolTip>
  );
};

export default TTIconButton;
