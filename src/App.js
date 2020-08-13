import React,  {useEffect, useState} from 'react';

import axios from "axios";
import './App.css';
import {Container, FormControl, InputLabel, Input, Button, Grid, Divider, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper} from "@material-ui/core";

function App() {
    const hostName = 'http://localhost:5000/customers/'
    const [customers, setCustomers] = useState([]);

    async function getCustomersData() {
        axios.get(hostName).then(function (response) {
            setCustomers(response.data)
        }).catch(function (error) {
            console.log(error);
        });
    }
    const firstNameRef = React.createRef();
    const lastNameRef = React.createRef();
    const emailRef = React.createRef();

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const emailAddress = emailRef.current.value;
        const body = {firstName, lastName, emailAddress};
        axios.post(hostName, body).then(function (response) {
            getCustomersData()
        }).catch(function (error) {
            console.log(error);
        });
    }
    useEffect(() => {
        getCustomersData()
    }, []);
  return (
    <div className="App">
     <Container >
         <form onSubmit={(e)=>handleFormSubmit(e)}>
         <Grid container justify="center" spacing={2}>
             <Grid  item>
                 <FormControl classes={'form-control'} required={true} margin={'normal'}>
                     <TextField label="First Name" inputRef={firstNameRef} required={true}  id="first-name-input"/>
                 </FormControl>
             </Grid>
             <Grid  item>
                 <FormControl  required={true}  margin={'normal'}>
                     <TextField  label="Last Name"  inputRef={lastNameRef} required={true} id="last-name-input"/>
                 </FormControl>
             </Grid>
             <Grid  item>
                 <FormControl required={true} margin={'normal'}>
                     <TextField  type={'email'} label="Email Address"  inputRef={emailRef} required={true} id="email-address-input" />
                 </FormControl>
             </Grid>
             <Grid  item>
                 <FormControl margin={'normal'}>
                     <Button
                         variant="contained"
                         color="primary"
                         type="submit">
                         Add
                     </Button>
                 </FormControl>
             </Grid>
         </Grid>
         </form>
         <Divider/>
         {(customers && customers.length > 0) && (
             <TableContainer  component={Paper}>
                 <Table>
                 <TableHead>
                     <TableRow>
                         <TableCell align="center">First Name</TableCell>
                         <TableCell align="center">Last Name</TableCell>
                         <TableCell align="center">Email</TableCell>
                     </TableRow>
                 </TableHead>
                 <TableBody>
                     {customers.map((customer) => (
                         <TableRow key={customer['_id']}>
                             <TableCell align='center'>{customer.firstName}</TableCell>
                             <TableCell align='center'>{customer.lastName}</TableCell>
                             <TableCell align='center'>{customer.emailAddress}</TableCell>
                         </TableRow>
                     ))}
                 </TableBody>
                 </Table>
             </TableContainer>
         )}
     </Container>
    </div>
  );
}

export default App;
