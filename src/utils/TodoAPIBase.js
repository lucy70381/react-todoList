import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ICON, METHOD } from './constants';

const MySwal = withReactContent(Swal);

const getHeaders = (method, header = {}, body = null) => {
  const headers = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...header,
    },
    ...(method !== METHOD.GET && body ? { body: JSON.stringify(body) } : {}),
  };
  return headers;
};

const verificateResponse = async (response) => {
  try {
    const res = await response?.json();
    const title = res?.message;
    const text = res?.error;
    let success;
    switch (response.status) {
      case 200:
      case 201:
        success = true;
        break;
      case 400:
      case 401:
      case 422:
        success = false;
        break;
      default:
    }

    MySwal.fire({
      toast: true,
      position: 'top',
      icon: success ? ICON.SUCCESS : ICON.ERROR,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title: title ?? (success ? '成功' : '失敗'),
      text,
    });
    return { success, ...res };
  } catch (error) {
    return { success: false, ...error };
  }
};

const getRequest = (url, method, header, body = null, verification = verificateResponse) => (
  fetch(url, getHeaders(method, header, body))
    .then(verification || verificateResponse)
);
export default getRequest;
