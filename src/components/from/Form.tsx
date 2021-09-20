import React, { useEffect, useState } from "react";

//    === COMPONENTS ===
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Alert from "@mui/material/Alert";

import style from "../../styles/form.module.scss";

interface StateObject {
  firstName: string;
  lastName: string;
  email: string;
  eventDate: Date | null;
}

interface Validation {
  form: boolean;
  firstName: boolean;
  lastName: boolean;
}

const Form = ({ uptade }: any) => {
  const [formValue, setformValue] = useState<StateObject>({
    firstName: "",
    lastName: "",
    email: "",
    eventDate: new Date("2021-01-01"),
  });
  const [validation, setValidation] = useState<Validation>({
    form: false,
    firstName: false,
    lastName: false,
  });

  //    === CHANGE DATE ===
  const handleDate = (newValue: Date | null) => {
    setformValue({ ...formValue, eventDate: newValue });
  };

  //    === VALIDATION ===
  useEffect(() => {
    if (formValue.firstName.length < 4 && formValue.lastName.length < 4) {
      setValidation({ form: true, firstName: true, lastName: true });
    } else if (
      formValue.firstName.length < 4 &&
      formValue.lastName.length >= 3
    ) {
      setValidation({ form: true, firstName: true, lastName: false });
    } else if (
      formValue.firstName.length >= 3 &&
      formValue.lastName.length < 4
    ) {
      setValidation({ form: true, firstName: false, lastName: true });
    } else {
      setValidation({ form: false, firstName: false, lastName: false });
    }
  }, [formValue]);

  //    === POST NEW EVENT ===
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validation.form === false) {
      const newEvent = await fetch("http://localhost:5000/event", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      });

      uptade();

      setformValue({
        firstName: "",
        lastName: "",
        email: "",
        eventDate: new Date("2021-01-01"),
      });

      return newEvent.json();
    }
  };

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) =>
        handleSubmit(event)
      }
    >
      {validation.form && (
        <Alert severity="error">You have to correct form</Alert>
      )}
      {validation.firstName && (
        <Alert severity="error">Too short first name</Alert>
      )}
      <TextField
        required
        className={style.input}
        id="outlined-basic"
        label="First name"
        variant="outlined"
        value={formValue.firstName}
        onChange={(event: any) =>
          setformValue({ ...formValue, firstName: event.target.value })
        }
      />
      {validation.lastName && (
        <Alert severity="error">Too short last name</Alert>
      )}
      <TextField
        required
        className={style.input}
        id="outlined-basic"
        label="Last name"
        variant="outlined"
        value={formValue.lastName}
        onChange={(event: any) =>
          setformValue({ ...formValue, lastName: event.target.value })
        }
      />
      <TextField
        required
        className={style.input}
        type="email"
        id="outlined-basic"
        label="Email"
        variant="outlined"
        value={formValue.email}
        onChange={(event: any) =>
          setformValue({ ...formValue, email: event.target.value })
        }
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Data urodzenia"
          inputFormat="MM/dd/yyyy"
          value={formValue.eventDate}
          onChange={handleDate}
          renderInput={(params) => (
            <TextField className={style.input} {...params} />
          )}
        />
      </LocalizationProvider>

      <Button variant="contained" type="submit">
        Add new event
      </Button>
    </form>
  );
};

export default Form;
