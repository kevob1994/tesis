import { message } from 'antd';

export const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const translateMonth = (month: string) => {
  switch (month) {
    case 'JANUARY':
      return 'Enero';
    case 'FEBRUARY':
      return 'Febrero';
    case 'MARCH':
      return 'Marzo';
    case 'APRIL':
      return 'Abril';
    case 'MAY':
      return 'Mayo';
    case 'JUNE':
      return 'Junio';
    case 'JULY':
      return 'Julio';
    case 'AUGUST':
      return 'Agosto';
    case 'SEPTEMBER':
      return 'Septiembre';
    case 'OCTOBER':
      return 'Octubre';
    case 'NOVEMBER':
      return 'Noviembre';
    case 'DECEMBER':
      return 'Diciembre';

    default:
      return 'Not found';
  }
};
