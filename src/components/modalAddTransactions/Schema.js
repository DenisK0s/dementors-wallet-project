import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
export default function Schema() {
  const { t } = useTranslation();
  let schema = yup.object().shape({
    type: yup.string().default('-').required(t('modalAddTransactionValType')),
    amount: yup
      .string()
      .max(10)
      .default('0.00')
      .required(t('modalAddTransactionValAmount')),

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
    comment: yup.string().max(15, t('modalAddTransactionValCommentMax')),
    newCategory: yup
      .string()
      .max(15, t('modalAddTransactionValNewCategoryMax')),
  });
}
