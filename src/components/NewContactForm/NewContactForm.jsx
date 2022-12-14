import { Add } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { nanoid } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from 'redux/contactSlice';

const NewContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const handleChange = e => {
    if (e.currentTarget.name === 'name') {
      setName(e.currentTarget.value);
    }

    if (e.currentTarget.name === 'number') {
      setNumber(e.currentTarget.value);
    }
  };

  const isSameContact = (name, number) => {
    return (
      contacts.find(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      ) || contacts.find(contact => contact.number.trim() === number.trim())
    );
  };

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    if (isSameContact(name, number)) {
      alert('This contact is already exists');
    } else {
      dispatch(addItem(newContact));
      setName('');
      setNumber('');
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    addContact(name, number);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          size="small"
          hiddenLabel
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          onChange={handleChange}
          value={name}
        />
        <TextField
          size="small"
          hiddenLabel
          id="outlined-basic"
          label="Number"
          variant="outlined"
          name="number"
          onChange={handleChange}
          value={number}
        />
        <Button type="submit" variant="contained" startIcon={<Add />}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default NewContactForm;
