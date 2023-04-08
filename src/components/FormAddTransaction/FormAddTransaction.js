
import { useState } from "react";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { stylesSelect } from './stylesForSelect';
import 'react-datetime/css/react-datetime.css';
import { useFormik } from 'formik';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';


import showModal from '../../redux/modal/modalActions';
import { transactionsOperations } from '../../redux/transactions';
import {
  categoriesOperations,
  categoriesSelectors,
} from '../../redux/categories';

import { ReactComponent as Plus } from '../../icons/plus.svg';
import { ReactComponent as Minus } from '../../icons/minus.svg';
import { ReactComponent as CalendarIcon } from '../../icons/calendar.svg';
import { ReactComponent as Close } from '../../icons/close.svg';

import Button from '../Button';
import DatePicker from '../DatePicker';
import styles from './FormAddTransaction.module.css';

import { formAddTransactionSchema } from '../../utils';

export default function ModalAddTransaction(props) {
  const DEFAULT_TRANSACTION_STATE = {
    type: false,
    sum: '',
    date: new Date(),
    comment: '',
    category: 'Вasic costs',
  };

  const categories = useSelector(categoriesSelectors.getCategories);
  const userBalanse = useSelector((state) => state.session.user.balance);

  const [disabled, setDisabled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoriesOperations.getCategories());
  }, [dispatch]);

  const checkAmount = (event) => {
    if (userBalanse < event.target.value) {
      setDisabled(true)
      alert({
        type: "error",
        text: "Sorry, but it appears your account has insufficient funds.",
        delay: 2000,
        animateSpeed: 'fast'
      });
    } else {
      setDisabled(false)
    }
  }

  const closeModal = (event) => {
    dispatch(showModal());
    setDisabled(false);
    document.body.style.overflow = 'visible';
  };

  const formik = useFormik({
    initialValues: DEFAULT_TRANSACTION_STATE,
    validationSchema: formAddTransactionSchema,
    onSubmit: async (values) => {
      const { type, category, sum, date, comment } = values;
      try {
        await dispatch(
          transactionsOperations.createTransaction({
            type,
            sum: parseFloat(sum) * 100,
            date: date,
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            comment: comment ? comment : ' ',
            category: category.label,
          })
        ).unwrap();
        formik.handleReset();
        closeModal();
      } catch (error) {
        // console.log(error)
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <button type="button" className={styles.closeButton} onClick={closeModal}>
        <Close />
      </button>
      <h4 className={styles.title}>Add transaction</h4>

      <div className={styles.swichContainer}>
        <label className={styles.switch}>
          <span className={styles.swichTitleIncome}>Income</span>

          <input
            type="checkbox"
            name="type"
            value={formik.values.type}
            onChange={(e) => {
              formik.handleChange(e);
              formik.handleChange({
                type: 'change',
                target: {
                  name: 'category',
                  value: null,
                },
              });
            }}
          />
          <div className={styles.slider}>
            <div className={styles.indicator}>
              {formik.values.type ? <Plus /> : <Minus />}
            </div>
          </div>
          <span className={styles.swichTitleIncome}>Income</span>
          <span className={styles.swichTitleExpense}>Expense</span>
        </label>
      </div>

      <div className={styles.categoriesContainer}>
        <Select
          placeholder="Select a category "
          options={categories.filter(
            (category) => category.type === formik.values.type
          )}
          styles={stylesSelect()}
          onChange={(event) =>
            formik.handleChange({
              type: 'change',
              target: {
                name: 'category',
                value: categories.find(
                  (category) => category.value === event.value
                ),
              },
            })
          }
          value={formik.values.category}
        />
      </div>
      <div className={styles.amountAndDateContainer}>
        <div className={styles.dateContainer}>
          <label className={styles.labelForm}>
            <input
              type="text"
              name="sum"
              autoComplete="off"
              placeholder="0.00"
              className={styles.inputForm}
              onChange={(event) => {
                if (
                  event.target.value === '' ||
                  /^[0-9]*(\.[0-9]?[0-9]?)?$/.test(event.target.value)
                ) {
                  formik.handleChange(event);
                  checkAmount(event);
                }
              }}
              value={formik.values.sum}
              required
            />
          </label>
        </div>

        <div className={styles.datepickerContainer}>
          <CalendarIcon className={styles.calendarIcon} />
          <DatePicker
            date={formik.values.date}
            updateDate={formik.handleChange}
          />
        </div>
      </div>

      <label className={styles.labelForm}>
        <input
          type="text"
          name="comment"
          placeholder="Comment"
          autoComplete="off"
          className={styles.inputComment}
          onChange={formik.handleChange}
          value={formik.values.comment}
        />
      </label>
      <Button
        type="submit"
        text="Add"
        color="green"
        disabled={disabled} />

      <Button
        text="Сancel"
        type="button"
        color="white"
        onClick={closeModal} />
    </form>
  );
}
