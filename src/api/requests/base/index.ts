import { AxiosRequestConfig } from 'axios';

import { api } from '../../api';

interface baseQueryProps {
  params: { limit: number; offset: number };
  config?: AxiosRequestConfig;
}

export const baseQuery = ({ params, config }: baseQueryProps) =>
  api.get<NamedAPIResourceList>(`pokemon`, { params, ...config });
