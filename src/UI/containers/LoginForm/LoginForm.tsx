import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Input, Button } from 'UI';
import { serviceLocator } from 'services';

import './LoginForm.scss';

type FormState = {
  login: string,
  password: string,
};

const defaultFormState: FormState = {
  login: '',
  password: '',
}

const formFields: Array<keyof FormState> = ['login', 'password'];

const LoginForm = () => {
  const history = useHistory();

  const [formState, setFormState] = useState<FormState>(defaultFormState);

  const handleFormUpdate = (name: string, value: string) => {
    const newState = {
      ...formState,
      [name]: value,
    };
    setFormState(newState);
  };

  const handleFormSubmit = async () => {
    const { login, password }: FormState = formState;
    await serviceLocator.userService.createFakeAuth(login, password)
      .then(() => {history.push('/messenger')})
      .catch((error: string) => {alert(error)});
  };

  return (
    <form className="LoginForm">
      <div>
        <h2 className="LoginForm_title">Wellcome back to our messanger</h2>
        <h3 className="LoginForm_subtitle">Sign in</h3>
      </div>
      {
        formFields.map((fieldName: keyof FormState) => (
          <Input
            key={`login-form-field-${fieldName}`}
            type="text"
            title={fieldName}
            placeholder={`Enter your ${fieldName}`}
            name={fieldName}
            value={formState[fieldName]}
            onChange={(name: string, value: string) => handleFormUpdate(name, value)}
          />
        ))
      }
      <Button
        content="Log in"
        onClick={handleFormSubmit}
      />
    </form>
  )
};

export { LoginForm };