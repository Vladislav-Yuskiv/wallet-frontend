import { TextField, styled } from '@mui/material';

const CustomTextFiledStyled = styled(TextField)({
  '& > div': {
    paddingLeft: '13px',
    paddingBottom: '9px'
  },
  '& input': {
    padding: 0,
    height: '25px',
    fontFamily: 'Circe',
    fontSize: '18px',
    lineHeight: '1.5'
  },
  '& input::placeholder': {
    color: '#bdbdbd'
  },
  '&  svg': {
    fill: '#e0e0e0'
  },
  '&  svg:last-child': {
    marginRight: '22px'
  },
  '&:hover svg, &:focus-within svg': {
    fill: '#000',
    transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
  },
  '@media screen and (min-width: 768px)': {
    '&  svg:last-child': {
      marginRight: '20px'
    }
  },
  '& p': { fontFamily: 'Segoe UI' }
});

export default CustomTextFiledStyled;
