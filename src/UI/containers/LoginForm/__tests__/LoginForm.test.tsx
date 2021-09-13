import { render } from '@testing-library/react';

import {
  LoginForm
} from '../LoginForm';

const renderComponent = () => {
  return render(<LoginForm/>);
};

describe('LoginForm', () => {
  it('Render without errors', () => {
    expect(renderComponent).not.toThrow();
  });
});