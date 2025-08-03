import { AxiosRequestConfig } from 'axios';

import { api } from '../../api';


type RequestPokemonParams = {
    params: { name: string },
    config? : AxiosRequestConfig
}

export const requestPokemonByName = ({params, config} : RequestPokemonParams) => 
    api.get<Pokemon>(`pokemon/${params.name}`, {...config});