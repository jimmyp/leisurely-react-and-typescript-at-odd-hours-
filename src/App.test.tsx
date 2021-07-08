import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApiConfig } from './apiConfig';
import { createStoreWithApiConfig } from './store';
import { Provider } from 'react-redux';
import App from './App';

const apiConfigStub : ApiConfig = {
  loadImages: (term: string) => Promise.resolve({
    hits: []
  })
}

const store = createStoreWithApiConfig(apiConfigStub)

test('can search', async () => {
  render(
    <Provider store={store}>
      <App borderColour="blue" />
    </Provider>
    );
  
  const searchButton = screen.getByRole('button', { name: 'Search' });

  fireEvent.click(searchButton);

  await screen.findByText('Term is required');

  const termInput = screen.getByRole('textbox');

  userEvent.type(termInput, 'tiger');

  userEvent.click(searchButton);

  await screen.findByRole('img');
});
