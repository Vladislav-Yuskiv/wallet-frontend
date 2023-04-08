import { styled } from '@mui/material';
import LinearProgress, {
  linearProgressClasses
} from '@mui/material/LinearProgress';

const BorderLinearProgress = styled(LinearProgress)({
  height: '4px',
  borderRadius: '2px',
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#E5F1EF'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: '2px',
    backgroundColor: '#24CCA7'
  }
});

export default function ProgressBar({ progress }) {
  return <BorderLinearProgress variant="determinate" value={progress} />;
}
