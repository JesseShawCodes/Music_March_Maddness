import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArtistSearch from './ArtistSearch';

// Mock the RTK Query hooks
jest.mock('../services/jsonServerApi', () => ({
  useStartSearchMutation: jest.fn(),
  useLazyGetTaskStatusQuery: jest.fn(),
}));

import { useStartSearchMutation, useLazyGetTaskStatusQuery } from '../services/jsonServerApi';

jest.mock('../components/Loading', () => ({ message }) => <div>Loading: {message}</div>);

describe('ArtistSearch', () => {
  let mockStartSearch;
  let mockTriggerStatus;
  let mockStartSearchLoading;
  let mockTriggerStatusData;

  beforeEach(() => {
    // Reset mocks before each test
    mockStartSearch = jest.fn();
    mockStartSearchLoading = false;
    mockTriggerStatus = jest.fn();
    mockTriggerStatusData = { status: null }; // Default to no status data initially

    // Configure the mock RTK Query hooks
    useStartSearchMutation.mockReturnValue([mockStartSearch, { isLoading: mockStartSearchLoading }]);
    useLazyGetTaskStatusQuery.mockReturnValue([mockTriggerStatus, { data: mockTriggerStatusData }]);

    // Mock setInterval and clearInterval for controlling polling in tests
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers(); // Clear any pending timers
    jest.useRealTimers(); // Restore real timers
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
  /*

  // --- Successful Search Flow ---
  test('handles successful search submission and polling for success', async () => {
    const mockTaskId = 'abc-123';
    const mockArtistResults = {
      results: {
        artists: {
          data: [
            { id: '1', attributes: { name: 'Artist A', artwork: { url: 'image-a.jpg' } } },
            { id: '2', attributes: { name: 'Artist B' } }, // No artwork
          ],
        },
      },
    };

    // Mock the initial search mutation success
    mockStartSearch.mockResolvedValueOnce({ task_id: mockTaskId });
    useStartSearchMutation.mockReturnValueOnce([mockStartSearch, { isLoading: false }]); // Reset after initial call

    render(<ArtistSearch />);
    const searchInput = screen.getByPlaceholderText('Search');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    // Expect startSearch to be called and loading message to appear
    expect(mockStartSearch).toHaveBeenCalledWith('test');
    expect(screen.getByText(/loading: submitting search.../i)).toBeInTheDocument();

    // After startSearch resolves, check for taskId and polling initiation
    await waitFor(() => {
      expect(screen.getByText(/loading: queued... waiting for results./i)).toBeInTheDocument();
      // Polling should have started, but triggerStatus hasn't resolved yet
      expect(mockTriggerStatus).toHaveBeenCalledWith(mockTaskId);
    });

    // Simulate polling for PENDING status
    act(() => {
      mockTriggerStatusData = { status: 'PENDING' };
      useLazyGetTaskStatusQuery.mockReturnValue([mockTriggerStatus, { data: mockTriggerStatusData }]);
      jest.advanceTimersByTime(2000); // Advance timer to trigger next poll
    });
    expect(mockTriggerStatus).toHaveBeenCalledTimes(2); // Called once initially, once after timer

    // Simulate polling for SUCCESS status
    act(() => {
      mockTriggerStatusData = { status: 'SUCCESS', result: mockArtistResults };
      useLazyGetTaskStatusQuery.mockReturnValue([mockTriggerStatus, { data: mockTriggerStatusData }]);
      jest.advanceTimersByTime(2000); // Advance timer to trigger next poll
    });

    // Expect results to be displayed and loading to disappear
    await waitFor(() => {
      expect(screen.getByText('Artist A')).toBeInTheDocument();
      expect(screen.getByAltText('Artist A promo')).toBeInTheDocument();
      expect(screen.getByText('Artist B')).toBeInTheDocument();
      expect(screen.getByText('No Image Available')).toBeInTheDocument();
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    // Ensure polling has stopped
    act(() => {
      jest.advanceTimersByTime(2000); // Try to trigger another poll
    });
    expect(mockTriggerStatus).toHaveBeenCalledTimes(3); // Should not have been called again after success
  });

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
