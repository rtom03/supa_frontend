import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export function ModalComp() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Authentication"
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
      <div>
        Login
      </div>
      </Modal>

      <Button variant="default" onClick={open}>
        Register
      </Button>
    </>
  );
}