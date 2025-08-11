import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { requestEvolutionChain } from '../requests/evolution-chain';
import { AxiosRequestConfig } from 'axios';

type EvolutionChainResponse = Awaited<ReturnType<typeof requestEvolutionChain>>;

export const useRequestEvolutionChain = (
  chainId: string,
  config?: AxiosRequestConfig,
  options?: UseQueryOptions<EvolutionChainResponse, Error>
) =>
  useQuery({
    queryKey: ['evolution-chain', chainId],
    queryFn: () => requestEvolutionChain({ params: { chainId }, config }),
    enabled: !!chainId,
    ...(options ?? {}),
  });
