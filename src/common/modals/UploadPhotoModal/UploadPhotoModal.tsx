import { useRef, useState } from 'react';
import { Modal, ModalProps } from '../Modal/Modal';
import Button from '../../buttons/Button/Button';
import { useUploadFile } from '../../../utils/imgbb/hooks/useUploadFile';
import styles from './UploadPhotoModal.module.scss';
interface UploadPhotoModalProps extends Omit<ModalProps, 'children'> {
  uid: User['uid'];
}

export const UploadPhotoModal = ({ onClose, uid, ...props }: UploadPhotoModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadFile } = useUploadFile();

  const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    setLoading(true);
    await uploadFile({ collection: 'users', file: event.target.files[0], id: uid! });

    onClose();
    setLoading(false);
  };

  return (
    <Modal {...props} onClose={onClose}>
      <div className={styles['upload-container']}>
        <label htmlFor="upload-button">
          <input
            type="file"
            id="upload-button"
            style={{ display: 'none' }}
            ref={fileInputRef}
            onChange={onFileInputChange}
          />
          <Button theme="blue" onClick={() => !loading && fileInputRef.current?.click()}>
            {!loading ? 'Upload your photo' : '('}
          </Button>
        </label>
        <Button theme="red" onClick={onClose}>
          CANCEL
        </Button>
      </div>
    </Modal>
  );
};
