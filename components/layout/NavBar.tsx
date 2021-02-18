import React, { useMemo } from 'react';
import { useColorMode, useDisclosure, Avatar } from '@chakra-ui/react';
import { Banner } from '../common/Texts';
import { MobileSideNav } from './LeftNav';
import useScreenSizes from '../../hooks/useScreenSizes';
import RightNav from './RightMenu';
import MenuBase from '../common/Menus';
import { MdMenu } from 'react-icons/all';
import { IconType } from 'react-icons';
import TTIconButton from '../common/IconButtons';
import theme from '../../theme';
import Link from 'next/link';
import { useUserContext } from '../users/UserContext';
import { Box, Flex, Stack } from '../../chakra/Layout';
import { IconButton } from '../../chakra/Forms';

interface INavBarProps {
  menuOpen: boolean;
  setMenuOpen: any;
}

const NavBar: React.FC<INavBarProps> = ({}) => {
  const { userName } = useUserContext();
  const { colorMode } = useColorMode();
  const { SCREEN_MOBILE } = useScreenSizes();

  const { isOpen: isLeftNavOpen, onOpen: onLeftNavOpen, onClose: onLeftNavClose } = useDisclosure();
  const { onClose: onMobileClose } = useDisclosure();

  const handleBurgerMenuPress = () => {
    if (SCREEN_MOBILE) {
      onLeftNavOpen();
    } else {
      onLeftNavOpen();
    }
  };

  const navAvatar: React.ReactNode = useMemo(
    () => (
      <MenuBase button={<Avatar size={SCREEN_MOBILE ? 'sm' : 'md'} name={userName} />}>
        <RightNav userName={userName} onClose={onMobileClose} />
      </MenuBase>
    ),
    [userName]
  );

  return (
    <Flex
      as="nav"
      w="100%"
      justifyContent="flex"
      alignItems="space-between"
      minH="6vh"
      position="relative"
      top={0}
      borderBottom="1px"
      color={theme.colors.borderColor[colorMode]}>
      <Stack isInline w="100%" justify="space-between" align="center">
        <Box mt={1}>
          <IconButton
            icon={<MdMenu />}
            size="md"
            onClick={handleBurgerMenuPress}
            color={theme.colors.iconColor[colorMode]}
            aria-label=""
            isRound
            fontSize="1.25em"
            variant="ghost"
          />
        </Box>
        <Banner mx={2} mt={1} textAlign={{ base: 'start', lg: 'start', md: 'start', sm: 'center' }}>
          PowerBuddy
        </Banner>
        <Flex>{navAvatar}</Flex>
      </Stack>
      {isLeftNavOpen && <MobileSideNav isOpen={isLeftNavOpen} onClose={onLeftNavClose} />}
    </Flex>
  );
};

interface INavItemProps {
  name: string;
  Icon: IconType;
  link: string;
  tooltip: string;
  memberStatusId: number;
  userMemberStatusId: number;
  onClose?: () => void;
  isOpen: boolean;
  idx: number;
}

export const LeftNavItem: React.FC<INavItemProps> = ({ Icon, link, tooltip, memberStatusId, userMemberStatusId }) => {
  return (
    <Box ml={2}>
      {userMemberStatusId >= memberStatusId && (
        <Stack spacing={1} isInline w="80%" py="0.5em" justify="space-between">
          <Link href={link}>
            <TTIconButton Icon={Icon} size="sm" label={tooltip} color="gray.100" onClick={() => undefined} />
          </Link>
        </Stack>
      )}
    </Box>
  );
};

export default NavBar;
