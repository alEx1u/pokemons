import { AxiosRequestConfig } from 'axios';
import { api } from '../../api';

interface RequestSpeciesParams {
  id: Pokemon['id'];
  config?: AxiosRequestConfig;
}

export const requestSpecies = ({ id, config }: RequestSpeciesParams) =>
  api.get<PokemonSpecies>(`pokemon-species/${id}`, { ...config });
