import { HStack, Icon } from '@chakra-ui/react';
import { GrayButton } from '@components/buttons';
import { CsrSearchModalContent } from '@components/modal-contents';
import ModalPopup, { ModalRefType } from '@components/modal-popup';
import { H4 } from '@components/texts';
import { useRef, useState } from 'react';
import { FaSearchengin } from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';

const CsrSelector = ({
  onChange,
}: {
  onChange: (val: { ID: string; NM: string }) => void;
}) => {
  const modalPopup = useRef<ModalRefType>(null);
  const [selectedCsr, setSelectedCsr] = useState<{
    ID: string;
    NM: string;
  }>();
  return (
    <HStack w="full">
      <GrayButton
        w="full"
        bg="gray.50"
        borderColor={'gray.200'}
        onClick={() => {
          modalPopup.current?.setOpen(true);
        }}
      >
        <HStack w="full" justifyContent={'space-between'}>
          <H4>{selectedCsr?.NM || '상담원 검색...'}</H4>
          <HStack gap={1}>
            {selectedCsr && (
              <Icon
                as={FaTimes}
                boxSize="12px"
                color="gray.600"
                cursor="pointer"
                _hover={{ color: 'gray.800' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCsr(undefined);
                  onChange({ ID: '', NM: '' });
                }}
              />
            )}
            <Icon as={FaSearchengin} />
          </HStack>
        </HStack>
      </GrayButton>
      <ModalPopup ref={modalPopup} headerTitle="상담원 검색">
        <CsrSearchModalContent
          defaultValue={selectedCsr?.NM}
          onChange={(val) => {
            setSelectedCsr(val);
            onChange(val);
            modalPopup.current?.setOpen(false);
          }}
        />
      </ModalPopup>
    </HStack>
  );
};

export default CsrSelector;
