import * as yup from 'yup';
let schema = yup.object().shape({
  type: yup
    .string()
    .default('-')
    .required(
      "Выберите тип транзакции 'Доход' или  'Расходы'. Это обязательное поле ",
    ),
  amount: yup
    .string()
    .max(10)
    .default('0.00')
    .required('Введите сумму. Это обязательное поле'),

  date: yup
    .string()
    .default(function () {
      const today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();
      let currentDate = dd + '.' + mm + '.' + yyyy;
      return currentDate;
    })
    .required(),
  comment: yup
    .string()
    .max(15, 'Максимально допустимая длинна комментария 15 символов'),
  category: yup
    .string()
    .max(15, 'Максимально допустимая длинна комментария 15 символов'),
});

export default schema;
