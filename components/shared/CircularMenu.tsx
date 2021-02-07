import { Box, Button, IconButton, Stack } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react';
import { BiDumbbell } from 'react-icons/bi';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FcCalendar } from 'react-icons/fc';
import { TextSm } from '../common/Texts';
import { CenterRowFlex } from '../layout/Flexes';

const CircularMenu = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const userMenu = useMemo(
    () => ({
      groups: [
        {
          items: [
            {
              name: `Week`,
              short: `W`,
              Icon: FcCalendar,
              toolTip: 'Click to progress through the weeks',
              onClick: () => {},
            },
          ],
        },
        {
          items: [
            {
              name: '',
              short: '',
              Icon: BiDumbbell,
              toolTip: '',
              onClick: () => {},
            },
          ],
        },
        {
          items: [
            {
              name: 'Options',
              short: '',
              Icon: BsFillGrid3X3GapFill,
              toolTip: 'Click to see options relating to this log',
              onClick: () => {},
            },
          ],
        },
      ],
    }),
    []
  );

  return (
    <Box>
      <IconButton aria-label="" icon={<BsFillGrid3X3GapFill />} onClick={() => setMenuOpen(!menuOpen)} isRound />
      <CenterRowFlex>
        {userMenu.groups.map((group, idx) => (
          <Box key={idx} display={menuOpen ? 'inline' : 'none'}>
            {group.items.map((item: any) => (
              <IconButton icon={<item.Icon />} p={0} aria-label="" onClick={(e) => item.onClick(e, false)} isRound></IconButton>
            ))}
          </Box>
        ))}
      </CenterRowFlex>
    </Box>
  );
};

export default CircularMenu;
