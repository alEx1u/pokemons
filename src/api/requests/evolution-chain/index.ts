import { AxiosRequestConfig } from 'axios';
import { api } from '../../api';

interface RequestEvolutionChainParams {
  params: { chainId: string };
  config?: AxiosRequestConfig;
}

export const requestEvolutionChain = ({ params, config }: RequestEvolutionChainParams) =>
  api.get<EvolutionChain>(`evolution-chain/${params.chainId}`, { ...config });
