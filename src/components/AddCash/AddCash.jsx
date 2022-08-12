import { useEffect } from 'react';
import { useState } from 'react';

import s from './AddCash.module.css';
import {
  useAddCashMutation,
  useGetCashQuery,
  useUpdateCashMutation,
} from 'redux/walletApi';

export const AddCash = ({ onTogle, cash }) => {
  const [addCashApi] = useAddCashMutation();
  const { data: cashList = [] } = useGetCashQuery();
  const [updateCashApi] = useUpdateCashMutation();

  const [amount, setAmount] = useState(cash?.amount ? cash?.amount : '');
  const [currency, setCurrency] = useState(
    cash?.currency ? cash?.currency : ''
  );
  const [moreEdit, setMoreEdit] = useState(cash?.id ? false : true);
  const handleMoreEdit = () => {
    setMoreEdit(prev => !prev);
    console.log(moreEdit);
  };

  const [btnDisablet, setBtnDisablet] = useState(true);
  useEffect(() => {
    if (amount.trim() && currency.trim()) {
      setBtnDisablet(false);
    } else {
      setBtnDisablet(true);
    }
  }, [setBtnDisablet, amount, currency]);

  const inputName = {
    amount: setAmount,
    currency: setCurrency,
  };
  const handleChangeInput = e => {
    const { name, value } = e.target;
    inputName[name](value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (cash?.id) {
      console.log('update');
      const id = cash?.id;
      updateCashApi({
        id,
        amount,
        currency,
      });
    } else {
      if (cashList.find(el => el.currency === currency)) {
        alert(`${currency} is already in wallet`);
      } else {
        addCashApi({
          amount,
          currency,
        });
        resetForm();
      }
    }

    onTogle();
  };

  const resetForm = () => {
    setAmount('');
    setCurrency('');
  };

  return (
    <form className={s.addCard} onSubmit={handleSubmit}>
      {!moreEdit && (
        <button type="button" onClick={() => handleMoreEdit()}>
          Редагувати дані
        </button>
      )}
      {moreEdit && (
        <label className={s.item}>
          Currency
          <input
            type="text"
            value={currency}
            name="currency"
            onChange={handleChangeInput}
          />
        </label>
      )}
      <label className={s.item}>
        Amount
        <input
          type="text"
          value={amount}
          name="amount"
          onChange={handleChangeInput}
        />
      </label>

      <button type="submit" disabled={btnDisablet}>
        {cash?.id ? 'Оновити' : 'Додати готівку'}
      </button>
      <button type="button" onClick={() => onTogle()}>
        Відмінити
      </button>
    </form>
  );
};
