import axios from 'axios';
import { Collection } from '../../firebase/firebase';
import { updateDocument } from '../../firebase/requests/updateDocument';

const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;

interface UploadFileProps {
  collection: Collection;
  file: File;
  id: string;
}

export const uploadFile = async ({ collection, file, id }: UploadFileProps) => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  if (!response.data.success) {
    throw new Error('Uploading file error');
  }

  await updateDocument<{ photoUrl: User['photoUrl'] }>(
    collection,
    { photoUrl: response.data.data.url },
    id
  );

  return response.data.data.url;
};
