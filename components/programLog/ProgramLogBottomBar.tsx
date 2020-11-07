import { Button, Stack, Box, LightMode, useDisclosure } from '@chakra-ui/core';
import React, { useMemo } from 'react';
import { useState } from 'react';
import { BsFillGrid3X3GapFill, FcCalendar, MdViewList } from 'react-icons/all';
import useScreenSizes from '../../hooks/useScreenSizes';
import { TextSm } from '../common/Texts';
import { CenterRowFlex } from '../layout/Flexes';
import ProgramLogBottomBarOptions from './ProgramLogBottomBarOptions';
import { useProgramLogContext } from './ProgramLogContext';

const ProgramLogBottomBar = ({ templateName, weekNo, handleWeekNoClick, programLog, changeViewClick }: any) => {
  const { isOpen: optionsOpen, onOpen: onOptionsOpen, onClose: onOptionsClose } = useDisclosure();
  const { SCREEN_MOBILE } = useScreenSizes();
  const { contentDisabled } = useProgramLogContext();

  console.log(contentDisabled);

  const userMenu = useMemo(
    () => ({
      groups: [
        {
          items: [
            {
              name: `Week ${weekNo}`,
              short: `W${weekNo}`,
              icon: FcCalendar,
              toolTip: 'Click to progress through the weeks',
              onClick: () => handleWeekNoClick(),
              disabled: false,
            },
          ],
        },
        {
          items: [
            {
              name: 'View',
              short: '',
              icon: MdViewList,
              toolTip: '',
              onClick: () => {
                changeViewClick();
              },
              disabled: false,
            },
          ],
        },
        {
          items: [
            {
              name: 'Options',
              short: '',
              icon: BsFillGrid3X3GapFill,
              toolTip: 'Click to see options relating to this diary',
              onClick: () => onOptionsOpen(),
              disabled: contentDisabled,
            },
          ],
        },
      ],
    }),
    [weekNo, templateName, contentDisabled]
  );

  return (
    <>
      <Box position="fixed" bottom="0">
        <CenterRowFlex wrap="nowrap" justify="center">
          <LightMode>
            {SCREEN_MOBILE
              ? userMenu.groups.map((group, idx) => (
                  <Box key={idx}>
                    {group.items.map((item: any) => (
                      <Button
                        key={item.name}
                        borderRadius={0}
                        alignItems="center"
                        justifyContent="left"
                        variant="solid"
                        size="md"
                        colorScheme="blue"
                        isDisabled={item.disabled ? true : false}
                        p={0}
                        onClick={(e) => item.onClick(e, false)}>
                        <Stack isInline px="1.0em" align="center" justify="center">
                          <Box as={item.icon} size="1.25em"></Box>
                          <TextSm>{item.short}</TextSm>
                        </Stack>
                      </Button>
                    ))}
                  </Box>
                ))
              : userMenu.groups.map((group, idx) => (
                  <Box key={idx}>
                    {group.items.map((item: any) => (
                      <Button
                        key={item.name}
                        borderRadius={0}
                        alignItems="center"
                        justifyContent="left"
                        variant="solid"
                        size="md"
                        colorScheme="blue"
                        p={0}
                        onClick={(e) => item.onClick(e, false)}>
                        <Stack isInline px="1.0em" align="center" justify="center">
                          <Box as={item.icon} size="1.25em"></Box>
                          <TextSm>{item.name}</TextSm>
                        </Stack>
                      </Button>
                    ))}
                  </Box>
                ))}
          </LightMode>
          <ProgramLogBottomBarOptions programLog={programLog} isOpen={optionsOpen} onClose={onOptionsClose} />
        </CenterRowFlex>
      </Box>
    </>
  );
};

export default ProgramLogBottomBar;
