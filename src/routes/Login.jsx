import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Context';
import FormInput from '../components/FormInput';
import * as TodoAPI from '../utils/TodoAPI';



const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const onSubmit = async (data) => {
    const userData = { user: data };
    const res = await TodoAPI.login(userData);
    if (res?.ok) {
      setToken(res.headers.get('authorization'));
      navigate('/todo', { replace: true });
    }
  }

  const loginFormatList = [
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
      }
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
      }
    }
  ]

  return (
    <div id='loginPage' className='bg-yellow'>
      <div className='container loginPage vhContainer '>
        <div className='side'>
          <NavLink to='/'><img className='logoImg' src='https://upload.cc/i1/2022/03/23/rhefZ3.png' alt='' /></NavLink>
          <img className='d-m-n' src='https://upload.cc/i1/2022/03/23/tj3Bdk.png' alt='workImg' />
        </div>
        <div>
          <form className='formControls' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='formControls_txt'>最實用的線上代辦事項服務</h2>
            {loginFormatList?.map(item => (
              <FormInput key={item.id} data={item} register={register} errors={errors} />
            ))}
            <input className='formControls_btnSubmit' type='submit' value='登入' disabled={Object.keys(errors)?.length > 0} />
            <NavLink className='formControls_btnLink' to='/register'>註冊帳號</NavLink>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;