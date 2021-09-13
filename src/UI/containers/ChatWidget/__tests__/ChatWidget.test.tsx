import { render } from '@testing-library/react';

import {
  ChatWidget
} from '../ChatWidget';

const renderComponent = () => {
  return render(<ChatWidget/>);
};

describe('ChatWidget', () => {
  it('Render without errors', () => {
    expect(renderComponent).not.toThrow();
  });
});