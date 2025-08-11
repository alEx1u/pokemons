import { useQuery } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { requestSpecies } from '../requests/species';

interface UseRequestSpeciesParams {
  id: Pokemon['id'];
  config?: AxiosRequestConfig;
}

export const useRequestSpecies = ({ id, config }: UseRequestSpeciesParams) =>
  useQuery({
    queryKey: ['pokemon-species', id],
    queryFn: () => requestSpecies({ id, config }),
  });
