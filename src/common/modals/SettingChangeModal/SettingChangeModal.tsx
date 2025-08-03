import { Modal, ModalProps } from "../Modal/Modal";
import {
  SettingChangeModalContent,
  SettingModalItem,
} from "./SettingChangeModalContent/SettingChangeModalContent";

interface SettingChangeModalProps extends Pick<ModalProps, "onClose"> {
  setting: SettingModalItem | null;
}

export const SettingChangeModal = ({
  onClose,
  setting,
  ...props
}: SettingChangeModalProps) => (
  <Modal {...props} isShowing={!!setting?.type} onClose={onClose}>
    {setting && (
      <SettingChangeModalContent setting={setting} onClose={onClose} />
    )}
  </Modal>
);
