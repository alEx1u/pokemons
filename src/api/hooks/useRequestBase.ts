import { useQuery } from '@tanstack/react-query';
import { baseQuery } from '../requests/base';

interface useRequestBaseProps {
    limit : number
    offset? : number
}

export const useRequestBase = ({ limit, offset = 0 } : useRequestBaseProps) => 
     useQuery({
        queryKey: ["pokemon", offset, limit],
        queryFn: () => baseQuery({ params: { limit, offset }}),
    });