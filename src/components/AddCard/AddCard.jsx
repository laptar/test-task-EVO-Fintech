import { useEffect } from 'react';
import { useState } from 'react';

import s from './AddCard.module.css';
import {
  useAddCardsMutation,
  useGetCardsQuery,
  useUpdateCardsMutation,
} from 'redux/walletApi';

export const AddCard = ({ onTogle, card }) => {
  const [addCardApi] = useAddCardsMutation();
  const { data: cardList = [] } = useGetCardsQuery();
  const [updateCardApi] = useUpdateCardsMutation();

  const [bankName, setBankName] = useState(card?.bankName ? card.bankName : '');
  const [cardNumber, setCardNumber] = useState(
    card?.cardNumber ? card.cardNumber : ''
  );
  const [expDate, setExpDate] = useState(card?.expDate ? card.expDate : '');
  const [cvv, setCvv] = useState(card?.amount ? card.amount : '');
  const [cardHolder, setCardHolder] = useState(
    card?.cardHolder ? card.cardHolder : ''
  );
  const [amount, setAmount] = useState(card?.amount ? card.amount : '');
  const [currency, setCurrency] = useState(card?.currency ? card.currency : '');
  const [cardType, setCardType] = useState(card?.cardType ? card.cardType : '');
  const [services, setServices] = useState(card?.services ? card.services : '');

  const [btnDisablet, setBtnDisablet] = useState(true);
  const [moreEdit, setMoreEdit] = useState(card?.id ? false : true);
  const handleMoreEdit = () => {
    setMoreEdit(prev => !prev);
    console.log(moreEdit);
  };

  useEffect(() => {
    if (
      services.trim() &&
      cardType.trim() &&
      bankName.trim() &&
      cardNumber.trim() &&
      expDate.trim() &&
      cvv.trim() &&
      amount.trim() &&
      currency.trim()
    ) {
      setBtnDisablet(false);
    } else {
      setBtnDisablet(true);
    }
  }, [
    services,
    cardType,
    bankName,
    cardNumber,
    expDate,
    cvv,
    amount,
    currency,
  ]);

  const inputName = {
    services: setServices,
    cardType: setCardType,
    bankName: setBankName,
    cardNumber: setCardNumber,
    expDate: setExpDate,
    cvv: setCvv,
    cardHolder: setCardHolder,
    amount: setAmount,
    currency: setCurrency,
  };
  const handleChangeInput = e => {
    const { name, value } = e.target;
    inputName[name](value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (card?.id) {
      const id = card?.id;
      updateCardApi({
        id,
        services,
        cardType,
        bankName,
        cardNumber,
        expDate,
        cvv,
        cardHolder,
        amount,
        currency,
      });
    } else {
      if (cardList.find(el => el.cardNumber === cardNumber)) {
        alert(`${cardNumber} is already in wallet`);
      } else {
        console.log('add');
        addCardApi({
          services,
          cardType,
          bankName,
          cardNumber,
          expDate,
          cvv,
          cardHolder,
          amount,
          currency,
        });
        resetForm();
      }
    }
    onTogle();
  };

  const resetForm = () => {
    setServices('');
    setCardType('');
    setCardNumber('');
    setExpDate('');
    setCvv('');
    setCardHolder('');
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
          Card Type
          <input
            type="text"
            value={cardType}
            name="cardType"
            onChange={handleChangeInput}
          />
        </label>
      )}
      {moreEdit && (
        <label className={s.item}>
          Financial services
          <input
            type="text"
            value={services}
            name="services"
            onChange={handleChangeInput}
          />
        </label>
      )}
      {moreEdit && (
        <label className={s.item}>
          Bank name
          <input
            type="text"
            value={bankName}
            name="bankName"
            onChange={handleChangeInput}
          />
        </label>
      )}
      {moreEdit && (
        <label className={s.item}>
          Card number
          <input
            type="text"
            value={cardNumber}
            name="cardNumber"
            onChange={handleChangeInput}
          />
        </label>
      )}
      {moreEdit && (
        <label className={s.item}>
          Exp date
          <input
            type="text"
            value={expDate}
            name="expDate"
            onChange={handleChangeInput}
          />
        </label>
      )}
      {moreEdit && (
        <label className={s.item}>
          CVV
          <input
            type="text"
            value={cvv}
            name="cvv"
            onChange={handleChangeInput}
          />
        </label>
      )}
      {moreEdit && (
        <label className={s.item}>
          Card holder
          <input
            type="text"
            value={cardHolder}
            name="cardHolder"
            onChange={handleChangeInput}
          />
        </label>
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
        {card?.id ? 'Оновити' : 'Додати картку'}
      </button>
      <button type="button" onClick={() => onTogle()}>
        Відмінити
      </button>
    </form>
  );
};
