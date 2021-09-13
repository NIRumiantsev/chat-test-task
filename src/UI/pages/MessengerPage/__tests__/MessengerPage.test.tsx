import { render } from '@testing-library/react';

import { MessengerPage } from '../MessengerPage';

const renderComponent = () => {
  return render(<MessengerPage/>);
};

describe('MessengerPage', () => {
  it('Render without errors', () => {
    expect(renderComponent).not.toThrow();
  });
});