import { ModalPopupRefType } from '@@types/ref-types';
import { Flex, Icon, useOutsideClick } from '@chakra-ui/react';
import React, {
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { FaX } from 'react-icons/fa6';

const ModalPopup = React.forwardRef<ModalPopupRefType, { children: ReactNode }>(
  ({ children }, parentRef) => {
    useImperativeHandle(parentRef, () => ({
      open: (val: boolean) => {
        setOpen(val);
      },
    }));

    const ref = useRef<HTMLDivElement>(null);

    const [isOpen, setOpen] = useState<boolean>(false);
    return (
      <Flex
        pos={'fixed'}
        top={0}
        left={0}
        w="full"
        h="full"
        display={(isOpen && 'block') || 'none'}
        zIndex={9999}
      >
        <Flex
          w="full"
          h="full"
          justifyContent={'center'}
          alignItems={'center'}
          pos="relative"
          border={'1px solid'}
          borderColor={'gray.300'}
        >
          {/* backdrop */}
          <Flex
            pos="absolute"
            top={0}
            w="full"
            h="full"
            left={0}
            bg="rgba(0, 0, 0, 0.5)"
            onClick={() => {
              setOpen(false);
            }}
            zIndex={1}
          ></Flex>
          {/* content */}
          <Flex
            ref={ref}
            minW={`360px`}
            maxW={`512px`}
            p={2}
            flexDir={'column'}
            gap={2}
            zIndex={2}
            pos={'relative'}
            h={'full'}
          >
            <Flex
              w="full"
              justifyContent={'flex-end'}
              onClick={() => {
                setOpen(false);
              }}
            >
              <Icon as={FaX} w={4} h={4} color={'black'} />
            </Flex>
            <Flex overflow={'hidden'}>{children}</Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
);

export default ModalPopup;
