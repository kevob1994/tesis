export const validatePassword = (rule: any, value: any, callback: any) => {
  if (value !== '' && value != undefined && value)
    if (
      !/^(?=.*[A-Z])(?=.*[@/#$.,^\-*])([A-Za-z\d@/#$.,^\-*]|[^ ]){8,100}$/.test(
        value
      )
    )
      callback(
        'La contraseña debe contener al menos 8 caracteres, una letra mayuscula y un caracter especial (* / $ # - . ,)'
      );
    else if (!/^[a-zA-Z0-9!@/#$.,^\-*]{1,100}$/.test(value)) {
      callback(
        'Los caracteres especiales validos son los siguientes (* / $ # - . ,) sin espacios en blanco!'
      );
    }
  callback();
};
