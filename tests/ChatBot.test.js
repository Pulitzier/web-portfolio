import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import ChatBot from './ChatBot';

jest.mock('axios');

describe('ChatBot', () => {
  test('renders without crashing', () => {
    render(<ChatBot />);
  });

  test('sends message to server and receives response', async () => {
    axios.post.mockResolvedValueOnce({ data: { fulfillmentText: 'Response from server' } });
    const { getByPlaceholderText, getByText } = render(<ChatBot />);

    const input = getByPlaceholderText('Type a message...');
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 13, charCode: 13 });

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith('/webhook', { message: 'Hello' });
      expect(getByText('Response from server')).toBeInTheDocument();
    });
  });
});