import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ICON } from './constants';

const MySwal = withReactContent(Swal);

export const getRequest = (url, method, header, body = null, verification) => {

  return (
    fetch(url, getHeaders(method, header, body))
      .then(verification || verificateResponse)
      .then(responseJSON => responseJSON)
  )
}

const getHeaders = (method, header = {}, body = null) => {
  let headers = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...header
    },
    ...((method !== 'GET' && body) ? { body: JSON.stringify(body) } : {}),
  }
  return headers;
}

const verificateResponse = async response => {

  try {
    let res = await response?.json();
    let title = res?.message ?? '';
    let text = res?.error ?? '';
    let icon;
    switch (response.status) {
      case 200:
      case 201:
        icon = ICON.SUCCESS;
        break;
      case 401:
      case 422:
        icon = ICON.ERROR;
        break;
      default:
        icon = ICON.SUCCESS;
    }
    MySwal.fire({
      toast: true,
      position: 'top',
      icon,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      title,
      text,
    });

  return response;
  } catch (error) {
    console.log(error);
  }
}