import React, { useEffect, useState } from 'react'
import { formValidate } from '../utils/formValidate'
import { useForm } from 'react-hook-form';
import { useFirestore } from '../hooks/useFirestore'
import FormError from '../components/FormError';
import FormInput from '../components/FormInput';
import Title from '../components/Title'
import Button from '../components/Button'
import { erroresFirebase } from '../utils/erroresFirebase';

const Home = () => {

  const [copy, setCopy] = useState({ propiedadX: true })
  const { required, patternURL } = formValidate();
  const { register, handleSubmit, formState: { errors }, resetField, setError, setValue } = useForm();
  const { loading, data, error, getData, addData, deleteData, updateData } = useFirestore();
  const [newOriginID, setOriginID] = useState();

  useEffect(() => {
    console.log("getData")
    getData()
  }, [])

  if (loading.getData) return <p>Loading data -----|</p>
  if (error) return <p>{error}</p>

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url)
        setOriginID("")
      } else {
        await addData(url)
      }

      resetField(url)

    } catch (error) {
      const { code, message } = erroresFirebase(error.code)
      setError(code, { message })
    }
  }

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid)
    console.log("URL Borrada! :(")
  }

  const pathURL = window.location.href;

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid)
  }

  return (
    <>
      <Title text="Administrador de URLS" />
      <form onSubmit={handleSubmit(onsubmit)}>
        <FormInput 
        label = "Ingresa tu URL"
        type = "text"
        placeholder = "https:// uao.edu.co"

        {...register("url",{
          required,
          pattern: patternURL
        })}
        error = {error.url}
        >
        <FormError error={error.url}/>
        </FormInput>
        {newOriginID?(<Button type="submit" text="edit" loading={loading.updateData} color="yellow"/>):(<Button type="submit" text="add URL" color="purple" loading={loading.addData} />)}
      </form>

        {data.map(
          <div key={item.nanoid}>
            <h5>{pathURL}{item.nanoid}</h5>
            <p>{item.origin}</p>
          </div>
        )}

    </>
  )
}

export default Home