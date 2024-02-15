import * as React from 'react';
import { styled, makeStyles } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={4}>
        <img src="https://www.ccmhhealth.com/wp-content/uploads/CCMH-Organ-Donor.png" alt="Donoryste" style={{ maxWidth: '100%', height: 'auto' }} />
      </Grid>
      <Grid item xs={8}>
        <Typography variant="body1">
          Apie kraujo donorystę egzistuoja daug mitų - neva tai alina organizmą, kad galima užsikrėsti hepatitu ar
          kitomis ligomis, kad priaugsi svorio ir nežinia, kur tas kraujas bus parduotas... Gaila, jei tokia klaidinga
          informaciją sustabdo galimus donorus nuo šio kilnaus ir net jų sveikatai naudingo veiksmo. Vieno donoro duotas
          kraujas gali išgelbėti net tris gyvybes. Žinoma, būna ir atvejų, kai vienam žmogui prireikia perpilti net
          dešimties donorų kraują. Kraujui paimti naudojamos tik vienkartinės sterilios priemonės, todėl nėra jokios
          užsikrėtimo kokiomis nors ligomis tikimybės.
        </Typography>
      </Grid>
    </Grid>
  );
}
