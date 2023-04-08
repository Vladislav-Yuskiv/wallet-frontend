import React, { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import waveMobile from '../../images/waves/wave-mobile.svg';
import waveTablet from '../../images/waves/wave-tablet.svg';
import waveDesktop from '../../images/waves/wave-desktop.svg';

import fetchCurrency from '../../API/fetchCurrency/fetchCurrency';

const useStyles = makeStyles({
  currency_section: {
    position: 'relative',
    width: '280px',
    height: '174px',
    borderRadius: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (min-width: 768px) and (max-width: 1279px)': {
      width: '334px'
    },

    '@media (min-width: 1280px)': {
      width: '348px',
      height: '348px'
    }
  },

  currency_table_container: {
    boxSizing: 'border-box',
    backgroundColor: '#4a56e2',
    width: '280px',
    height: '174px',
    borderRadius: '30px',
    textAlign: 'center',
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    '@media (max-width: 767px)': {
      backgroundImage: `url(${waveMobile})`
    },
    '@media (min-width: 768px) and (max-width: 1279px)': {
      width: '334px',
      backgroundImage: `url(${waveTablet})`
    },

    '@media (min-width: 1280px)': {
      width: '348px',
      height: '348px'
    }
  },

  currency_header_bg: {
    position: 'absolute',
    height: '50px',
    width: '280px',
    borderRadius: '30px 30px 0px 0px',

    backgroundColor: '#ffff',
    opacity: '0.2',
    '@media (min-width: 768px) and (max-width: 1279px)': {
      width: '334px'
    },
    '@media (min-width: 1280px)': {
      height: '60px',
      width: '348px'
    }
  },

  currency_head: {
    height: '50px',
    '@media (min-width: 1280px)': {
      height: '60px'
    }
  },

  currency_header: {
    fontFamily: 'Circe',
    fontWeight: 700,
    fontSize: '18px',
    padding: '0px, 0px, 0px, 12px',
    color: '#ffff',
    borderBottom: '0px'
  },

  currency_item: {
    fontFamily: 'Circe',
    fontWeight: 400,
    fontSize: '16px',
    color: '#ffff',
    borderBottom: '0px',
    paddingTop: '10px',
    '@media (min-width:1280px)': {
      paddingTop: '20px'
    }
  },

  currency_waves: {
    display: 'none',
    '@media (min-width:1280px)': {
      display: 'block',
      height: '134px',
      width: '100%',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url(${waveDesktop})`
    }
  }
});

const Currency = () => {
  const [currency, setCurrency] = useState([]);
  const styles = useStyles();

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchCurrency();
        const sliced = data.slice(0, -1);
        setCurrency([...sliced]);
      } catch (error) {
        console.log(error);
      }
    };

    const id = setInterval(() => {
      fetch();
    }, 300000);

    fetch();

    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className={styles.currency_section}>
        <div className={styles.currency_header_bg}></div>
        <TableContainer className={styles.currency_table_container}>
          <Table size='small'>
            <TableHead className={styles.currency_head}>
              <TableRow className={styles.currency_head_row}>
                <TableCell className={styles.currency_header}>
                  Currency
                </TableCell>

                <TableCell align='center' className={styles.currency_header}>
                  Buy
                </TableCell>
                <TableCell align='center' className={styles.currency_header}>
                  Sale
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.currency_body}>
              {currency?.map((element) => (
                <TableRow key={element.ccy}>
                  <TableCell
                    component='th'
                    scope='row'
                    align='left'
                    className={styles.currency_item}
                  >
                    {element.ccy}
                  </TableCell>
                  <TableCell align='center' className={styles.currency_item}>
                    {parseFloat(element.buy).toFixed(2).padStart(5, 0)}
                  </TableCell>
                  <TableCell align='center' className={styles.currency_item}>
                    {parseFloat(element.sale).toFixed(2).padStart(5, 0)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={styles.currency_waves}></div>
        </TableContainer>
      </div>
    </>
  );
};

export default Currency;
