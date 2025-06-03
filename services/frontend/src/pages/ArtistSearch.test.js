import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArtistSearch from './ArtistSearch';

// Mock the RTK Query hooks
jest.mock('../services/jsonServerApi', () => ({
  useStartSearchMutation: jest.fn(),
  useLazyGetTaskStatusQuery: jest.fn(),
  useLazyGetArtistsQuery: jest.fn(), 
}));

import { useStartSearchMutation, useLazyGetTaskStatusQuery, useLazyGetArtistsQuery  } from '../services/jsonServerApi';

jest.mock('../components/Loading', () => ({ message }) => <div>Loading: {message}</div>);

describe('ArtistSearch', () => {
  let mockStartSearchTrigger;
  let mockStartSearchState;
  let mockTriggerStatusTrigger;
  let mockTriggerStatusState;
  let mockTriggerArtistsTrigger;
  let mockTriggerArtistsState;

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks(); // Clears call history, but not implementation

    // Default mock implementations for RTK Query hooks
    mockStartSearchTrigger = jest.fn();
    mockStartSearchState = { isLoading: false, isError: false, error: null };
    useStartSearchMutation.mockReturnValue([mockStartSearchTrigger, mockStartSearchState]);

    mockTriggerStatusTrigger = jest.fn();
    mockTriggerStatusState = { data: undefined, isLoading: false, isError: false, error: null };
    useLazyGetTaskStatusQuery.mockReturnValue([mockTriggerStatusTrigger, mockTriggerStatusState]);

    mockTriggerArtistsTrigger = jest.fn();
    mockTriggerArtistsState = { data: undefined, isLoading: false, isError: false, error: null, isSuccess: false };
    useLazyGetArtistsQuery.mockReturnValue([mockTriggerArtistsTrigger, mockTriggerArtistsState]);

    // Use fake timers for controlling setInterval/setTimeout
    jest.useFakeTimers();
  });

  afterEach(() => {
    // Ensure all pending timers are cleared after each test
    jest.runOnlyPendingTimers();
    // Restore real timers to prevent interference with other test files
    jest.useRealTimers();
  });

  // --- Initial Render and Basic Interactions ---
  test('renders with initial elements and empty search input', () => {
    render(<ArtistSearch />);
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).not.toBeDisabled();
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/no image available/i)).not.toBeInTheDocument();
  });

  test('updates query state on input change', () => {
    render(<ArtistSearch />);
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test artist' } });
    expect(searchInput).toHaveValue('test artist');
  });

  // --- Successful Search Flow ---
  test('handles successful search submission and polling for success', async () => {
    const mockTaskId = 'abc-123';
    const mockArtistResults = {
      results: {
        artists: {
          data: [
            { id: '1', attributes: { name: 'Artist A', artwork: { url: 'image-a.jpg' } } },
            { id: '2', attributes: { name: 'Artist B' } },
          ],
        },
      },
    };

    // 1. Mock the initial `triggerSearch` (from useLazyGetArtistsQuery) to return a taskId
    mockTriggerArtistsTrigger.mockResolvedValueOnce({ data: { task_id: mockTaskId } });
    mockTriggerArtistsState.isLoading = false; // Initial search completes quickly for this step
    useLazyGetArtistsQuery.mockReturnValue([mockTriggerArtistsTrigger, mockTriggerArtistsState]);

    render(<ArtistSearch />);
    const searchInput = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    // Assert that `triggerSearch` was called for the initial artist search
    expect(mockTriggerArtistsTrigger).toHaveBeenCalledWith('test');
    // Expect the initial loading message for the first query to appear briefly and then clear
    // (This part might be tricky to catch precisely as the component quickly transitions to polling)
    // For now, we'll focus on the subsequent polling loading.

    // Wait for the taskId to be set and polling to initiate
    await waitFor(() => {
      // After initial triggerSearch resolves and taskId is set, polling should start
      expect(mockTriggerStatusTrigger).toHaveBeenCalledWith(mockTaskId);
      expect(screen.getByTestId('loading-component')).toHaveTextContent('Loading: Queued... waiting for results.'); //
    });
    /*

    // 2. Simulate polling for PENDING status
    act(() => {
      mockTriggerStatusState.data = { status: 'PENDING' };
      useLazyGetTaskStatusQuery.mockReturnValueOnce([mockTriggerStatusTrigger, mockTriggerStatusState]);
      jest.advanceTimersByTime(2000); // Advance timer to trigger next poll
    });
    // Expect triggerStatus to have been called twice (initial + one poll)
    expect(mockTriggerStatusTrigger).toHaveBeenCalledTimes(2);

    // 3. Simulate polling for SUCCESS status
    act(() => {
      mockTriggerStatusState.data = { status: 'SUCCESS', result: mockArtistResults };
      useLazyGetTaskStatusQuery.mockReturnValueOnce([mockTriggerStatusTrigger, mockTriggerStatusState]);
      jest.advanceTimersByTime(2000); // Advance timer to trigger final poll check
    });

    // Expect results to be displayed and loading/error to disappear
    await waitFor(() => {
      expect(screen.getByText('Artist A')).toBeInTheDocument();
      expect(screen.getByAltText('Artist A promo')).toBeInTheDocument();
      expect(screen.getByText('Artist B')).toBeInTheDocument();
      expect(screen.getByText('No Image Available')).toBeInTheDocument();
      expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument();
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    // Ensure polling has stopped after SUCCESS
    act(() => {
      jest.advanceTimersByTime(2000); // Try to trigger another poll
    });
    // TriggerStatus should still be called twice (initial from useEffect, and one from the first interval)
    // The second useEffect (Turn off Polling) should clear the interval after SUCCESS
    //expect(mockTriggerStatusTrigger).toHaveBeenCalledTimes(2);
    */
  });
  /*

  // --- Error Handling ---
  test('handles search submission error', async () => {
    const mockErrorMessage = 'Failed to start search';
    mockStartSearch.mockRejectedValueOnce(new Error(mockErrorMessage));
    useStartSearchMutation.mockReturnValueOnce([mockStartSearch, { isLoading: false }]);

    render(<ArtistSearch />);
    const searchInput = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'error query' } });
    fireEvent.click(searchButton);

    // Expect error message to be displayed and no polling initiated
    await waitFor(() => {
      expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      expect(mockTriggerStatus).not.toHaveBeenCalled();
    });
  });

  test('handles polling for FAILURE status', async () => {
    const mockTaskId = 'def-456';

    mockStartSearch.mockResolvedValueOnce({ task_id: mockTaskId });
    useStartSearchMutation.mockReturnValueOnce([mockStartSearch, { isLoading: false }]);

    render(<ArtistSearch />);
    const searchInput = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'fail query' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(/loading: queued... waiting for results./i)).toBeInTheDocument();
    });

    // Simulate polling for FAILURE status
    act(() => {
      mockTriggerStatusData = { status: 'FAILURE' };
      useLazyGetTaskStatusQuery.mockReturnValue([mockTriggerStatus, { data: mockTriggerStatusData }]);
      jest.advanceTimersByTime(2000);
    });

    await waitFor(() => {
      expect(screen.getByText(/there was an error processing your search\. please try again\./i)).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      expect(screen.queryByText('Artist A')).not.toBeInTheDocument(); // No results
    });

    // Ensure polling has stopped
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(mockTriggerStatus).toHaveBeenCalledTimes(2); // Should not have been called again after failure
  });

  // --- Polling Cleanup ---
  test('clears polling interval on component unmount', async () => {
    const mockTaskId = 'xyz-789';
    mockStartSearch.mockResolvedValueOnce({ task_id: mockTaskId });
    useStartSearchMutation.mockReturnValueOnce([mockStartSearch, { isLoading: false }]);

    const { unmount } = render(<ArtistSearch />);
    const searchInput = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'unmount test' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockTriggerStatus).toHaveBeenCalled(); // Polling should have started
    });

    unmount(); // Unmount the component

    act(() => {
      jest.advanceTimersByTime(2000); // Advance timer after unmount
    });

    // Ensure triggerStatus was not called again after unmount
    expect(mockTriggerStatus).toHaveBeenCalledTimes(1); // Only called once initially
  });
  */
});
