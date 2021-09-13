import { render } from '@testing-library/react';

import { LoginPage } from '../LoginPage';

const renderComponent = () => {
  return render(<LoginPage/>);
};

describe('LoginPage', () => {
  it('Render without errors', () => {
    expect(renderComponent).not.toThrow();
  });
});