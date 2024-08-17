import {useQuery} from "@tanstack/react-query";
import axios from "axios";

export interface IProductType {
    id: number
    name: string
}
export function useProductType() {
    const { data,error,isSuccess, isFetching,refetch } = useQuery({
        queryKey: ['product-type'],
        queryFn: async () => {
            return await axios.get<IProductType[]>('http://localhost:3000/product-type')
        },
        select: (data) => data.data,

    })

  return { data,error,isSuccess, isFetching, refetch }
}