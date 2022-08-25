import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { useAuth } from '../components/Context';
import * as TodoAPI from '../utils/TodoAPI';

const Register = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async ({ password2, ...data }) => {
    const userData = { user: { ...data } };
    const res = await TodoAPI.register(token, userData);
    if (res?.ok) {
      setToken(res.headers.get('authorization'));
      res?.ok && navigate('/todo', { replace: true });
    }
  }

  const formFormatList = [
    {
      id: 'email',
      type: 'text',
      labelName: 'Email',
      placeholder: '請輸入 email',
      verify: {
        require: '此欄位必填',
        pattern: {
          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          message: 'Email 格式不符',
        }
      },
    },
    {
      id: 'nickname',
      type: 'text',
      labelName: '您的暱稱',
      placeholder: '請輸入您的暱稱',
      verify: {
        require: '此欄位必填',
      },
    },
    {
      id: 'password',
      type: 'password',
      labelName: '密碼',
      placeholder: '請輸入密碼',
      verify: {
        require: '此欄位必填',
        minLength: {
          value: 6,
          message: '密碼長度必須至少六位'
        }
      },
    },
    {
      id: 'password2',
      type: 'password',
      labelName: '再次輸入密碼',
      placeholder: '請再次輸入密碼',
      verify: {
        require: '此欄位必填',
        validate: (password2) => (password2 === watch('password', '') || '密碼不同，請重新確認')
      },
    },
  ]
  
  return (
    <div id='signUpPage' className='bg-yellow'>
      <div className='container signUpPage vhContainer'>
        <div className='side'>
          <NavLink to='/'><img className='logoImg' src='https://upload.cc/i1/2022/03/23/rhefZ3.png' alt='' /></NavLink>
          <img className='d-m-n' src='https://upload.cc/i1/2022/03/23/tj3Bdk.png' alt='workImg' />
        </div>
        <div>
          <form className='formControls' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='formControls_txt'>註冊帳號</h2>
            {formFormatList.map(item => (
              <FormInput key={item.id} data={item} register={register} errors={errors} />
            ))}
            <input className='formControls_btnSubmit' type='submit' value='註冊帳號' />
            <NavLink className='formControls_btnLink' to='/login'>登入</NavLink>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;