import React from 'react';
import { render, screen } from '@testing-library/react-native';
import HomeScreen from '../index';
import useGetData from '@/hooks/use-get-data.hook';
import { Item } from '@/assets/mockedData';

// Mock the hooks
jest.mock('@/hooks/use-get-data.hook');

// Mock expo-router since ListItemComponent uses it
jest.mock('expo-router', () => ({
  useRouter: () => ({
    navigate: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn()
  })
}));

const mockUseGetData = useGetData as jest.MockedFunction<typeof useGetData>;

describe('HomeScreen', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading indicator when data is loading', () => {
    mockUseGetData.mockReturnValue({
      data: undefined,
      loading: true,
      error: null,
      getDataFromId: jest.fn()
    });

    render(<HomeScreen />);

    const loadingIndicator = screen.getByTestId('loading-indicator');
    expect(loadingIndicator).toBeVisible();
  });

  it('should render error message when there is an error', () => {
    const errorMessage = 'Error fetching data';
    mockUseGetData.mockReturnValue({
      data: undefined,
      loading: false,
      error: new Error(errorMessage),
      getDataFromId: jest.fn()
    });

    render(<HomeScreen />);

    const errorText = screen.getByTestId('error-message');
    expect(errorText).toBeVisible();
  });

  it('should render FlatList with data when data is available', () => {
    const mockData: Item[] = [
      {
        id: '1',
        title: 'Test Video 1',
        description: 'Test description 1',
        thumbnail: 'https://example.com/thumb1.jpg',
        streamUrl: 'https://example.com/stream1.m3u8',
        duration: 100
      },
      {
        id: '2',
        title: 'Test Video 2',
        description: 'Test description 2',
        thumbnail: 'https://example.com/thumb2.jpg',
        streamUrl: 'https://example.com/stream2.m3u8',
        duration: 200
      }
    ];

    mockUseGetData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
      getDataFromId: jest.fn()
    });

    render(<HomeScreen />);

    const flatList = screen.getByTestId('flat-list');
    expect(flatList).toBeVisible();

    const listItems = screen.getAllByTestId('list-item-container');
    expect(listItems).toHaveLength(2);
  });

  it('should render empty FlatList when data is empty array', () => {
    mockUseGetData.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      getDataFromId: jest.fn()
    });

    render(<HomeScreen />);

    const flatList = screen.getByTestId('flat-list');
    expect(flatList).toBeVisible();
    expect(flatList.props.data).toEqual([]);
  });
});
