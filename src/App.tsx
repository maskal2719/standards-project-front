import './App.css'
import {IProductType, useProductType} from "./hooks/useProductType.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
function App() {
    const {data,refetch} = useProductType()
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationKey: ['create-product-type'],
        mutationFn: async (newProductType: Omit<IProductType, 'id'>) => {
            return await axios.post('http://localhost:3000/product-type', newProductType)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['product-type']})
        }
    });

  return (
    <>
      <h1>Vite + React</h1>
        <div>
            {data?.map((el) => {
                return <div key={el.id}>{el.name}</div>
            })}
        </div>
        <button onClick={() => {
            mutate({name: 'Галоши'} )
        }}>Create</button>
    </>
  )
}

export default App
