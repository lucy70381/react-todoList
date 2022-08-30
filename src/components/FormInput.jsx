import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ data, register, errors }) => {
  const {
    id, type, labelName, placeholder, verify,
  } = data;
  return (
    <>
      <label className='formControls_label' htmlFor={id}>
        {labelName}
      </label>
      <input
        className='formControls_input'
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(id, verify)}
      />
      {errors?.[id] && <span>{errors[id]?.message}</span>}
    </>
  );
};

FormInput.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    labelName: PropTypes.string,
    placeholder: PropTypes.string,
    verify: PropTypes.shape({}),
  }),
  register: PropTypes.func.isRequired,
  errors: PropTypes.shape({}),
};

FormInput.defaultProps = {
  data: {
    id: '',
    type: '',
    labelName: '',
    placeholder: '',
    verify: {},
  },
  errors: {},
};

export default FormInput;
