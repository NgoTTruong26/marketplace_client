import * as yup from "yup"
import { FormProvider, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { createCollectionDTO } from "../services/createCollection.ts"

const formSchema = yup.object({
  name: yup.string().required(),
  floor_price: yup.number().required(),
  description: yup.string().required(),
  image_url: yup.string().required(),
  banner_url: yup.string().required(),
  total_volume: yup.number().required(),
  category_id: yup.number().required(),


})

export default function CreateCollections() {

  const methods = useForm<createCollectionDTO>({
    resolver: yupResolver(formSchema),
    mode: "onChange"
  })

  const onSubmit =(data: createCollectionDTO)=>{

  }
  return (
    <>
     <FormProvider {...methods} >
       <form onSubmit={methods.handleSubmit(onSubmit)}>


       </form>

     </FormProvider>
    </>
  )
}