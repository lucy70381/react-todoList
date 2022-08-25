const FormInput = ({ data, register, errors }) => {
  const { id, type, labelName, placeholder, verify } = data;
  return (
    <>
      <label className='formControls_label' htmlFor={id}>{labelName}</label>
      <input className='formControls_input'type={type} id={id} name={id} placeholder={placeholder}
        {...register(id, verify)}
      />
      {errors?.[id] && <span>{errors[id]?.message}</span>}
    </>
  )
}

export default FormInput;