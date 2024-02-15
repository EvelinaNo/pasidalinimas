import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Alert, Box, Button, Grid, List, ListItem, ListItemText, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

export const Registration = () => {
  const gender = [{ label: 'Vyras' }, { label: 'Moteris' }];

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    bloodGroup: '',
  });

  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://dummyjson.com/users')
      .then((response) => {
        setUsers(response.data.users);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = () => {
    setOpenSnackbar(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  const handleDelete = (id) => {
    axios
    .delete(`https://dummyjson.com/users/${id}`)
    .then ( (res) => {
        const deleteUser = res.data;
        const filteredUsers = users.filter(person => person.id !== deleteUser.id);
        setUsers(filteredUsers)
    } )
    .catch (err => console.log(err))
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    axios
      .post('https://dummyjson.com/users/add', form)
      .then((res) => {
        console.log(res);
        setUsers([...users, res.data]);
        setForm({
          firstName: '',
          lastName: '',
          age: '',
          gender: '',
          bloodGroup: '',
        });
        setOpenSnackbar(true);
      })
      .catch((err) => console.log(err));
  };

  console.log(users);
  if (isLoading) {
    return <div>Palaukite truputėlį</div>;
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10%', marginTop: '5%' }}>
        <form onSubmit={handleSubmitForm}>
          <Box sx={{ flex: '1 0 30%' }}>
            <TextField
              id="outlined-basic"
              value={form.firstName}
              name="firstName"
              label="Vardas"
              variant="outlined"
              onChange={handleForm}
              sx={{ width: '100%', marginBottom: 2 }}
            />
            <TextField
              id="outlined-basic"
              value={form.lastName}
              name="lastName"
              label="Pavardė"
              variant="outlined"
              onChange={handleForm}
              sx={{ width: '100%', marginBottom: 2 }}
            />
            <TextField
              id="outlined-basic"
              value={form.age}
              name="age"
              label="Amžius"
              variant="outlined"
              onChange={handleForm}
              sx={{ width: '100%', marginBottom: 2 }}
            />
            <TextField
              id="outlined-basic"
              value={form.bloodGroup}
              name="bloodGroup"
              label="Kraujo grupė"
              variant="outlined"
              onChange={handleForm}
              sx={{ width: '100%', marginBottom: 2 }}
            />
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              name="gender"
              defaultValue={form.gender}
              options={gender}
              onChange={handleForm}
              sx={{ width: '100%', marginBottom: 2 }}
              renderInput={(params) => <TextField {...params} label="Lytis" />}
            />
            <Button onClick={handleClick} type="submit" variant="text" size="large" sx={{ color: 'black' }}>
              Tapti donoru
            </Button>
            <Snackbar 
            open={openSnackbar} 
            autoHideDuration={6000} 
            onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
                Esate sėkmingai pridėtas į donorų sąrašą!
              </Alert>
            </Snackbar>
          </Box>
        </form>

        <Box sx={{ flex: '2 0 70%' }}>
          <List sx={{ paddingTop: 0 }}>
            {users.map((donor, index) => (
              <ListItem key={index} sx={{ paddingTop: 0 }}>
                <ListItemText
                  primary={`${donor.firstName}, ${donor.lastName}, ${donor.age}, ${donor.gender}, ${donor.bloodGroup}`}
                />
                <Button sx={{ marginRight: '5%' }} size="small" variant="outlined" color="primary" onClick={() => navigate(`/donor/${donor.id}`)}>
                  Daugiau
                </Button>
                <Grid item xs={8}>
        <DeleteOutlinedIcon sx={{ cursor: 'pointer' }} onClick={() => handleDelete(donor.id)}/>
      </Grid>
              </ListItem>
            ))}
            {/* <ListItem>
  <ListItemText primary={`Nauji donorai: ${form.firstName}, ${form.lastName}, ${form.age}, ${form.gender}, ${form.bloodGroup} `}/>
          </ListItem> */}
          </List>
        </Box>
      </Box>
    </>
  );
};
