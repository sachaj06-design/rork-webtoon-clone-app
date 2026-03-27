import createContextHook from '@nkzw/create-context-hook';
import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initialUserState, UserState } from '@/mocks/webtoonData';

const USER_STATE_KEY = 'webtoon_user_state';

export const [UserProvider, useUser] = createContextHook(() => {
  const [userState, setUserState] = useState<UserState>(initialUserState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserState();
  }, []);

  const loadUserState = async () => {
    try {
      const stored = await AsyncStorage.getItem(USER_STATE_KEY);
      if (stored) {
        setUserState(JSON.parse(stored));
      }
    } catch (error) {
      console.log('Error loading user state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveUserState = async (newState: UserState) => {
    try {
      await AsyncStorage.setItem(USER_STATE_KEY, JSON.stringify(newState));
    } catch (error) {
      console.log('Error saving user state:', error);
    }
  };

  const markAsRead = useCallback((episodeId: string) => {
    setUserState(prev => {
      if (prev.readHistory.includes(episodeId)) return prev;
      const newState = {
        ...prev,
        readHistory: [...prev.readHistory, episodeId],
      };
      saveUserState(newState);
      return newState;
    });
  }, []);

  const toggleSubscription = useCallback((seriesId: string) => {
    setUserState(prev => {
      const isSubscribed = prev.subscribedSeries.includes(seriesId);
      const newState = {
        ...prev,
        subscribedSeries: isSubscribed
          ? prev.subscribedSeries.filter(id => id !== seriesId)
          : [...prev.subscribedSeries, seriesId],
      };
      saveUserState(newState);
      return newState;
    });
  }, []);

  const toggleFavorite = useCallback((seriesId: string) => {
    setUserState(prev => {
      const isFavorite = prev.favorites.includes(seriesId);
      const newState = {
        ...prev,
        favorites: isFavorite
          ? prev.favorites.filter(id => id !== seriesId)
          : [...prev.favorites, seriesId],
      };
      saveUserState(newState);
      return newState;
    });
  }, []);

  const isEpisodeRead = useCallback((episodeId: string) => {
    return userState.readHistory.includes(episodeId);
  }, [userState.readHistory]);

  const isSeriesSubscribed = useCallback((seriesId: string) => {
    return userState.subscribedSeries.includes(seriesId);
  }, [userState.subscribedSeries]);

  const isSeriesFavorite = useCallback((seriesId: string) => {
    return userState.favorites.includes(seriesId);
  }, [userState.favorites]);

  return {
    userState,
    isLoading,
    markAsRead,
    toggleSubscription,
    toggleFavorite,
    isEpisodeRead,
    isSeriesSubscribed,
    isSeriesFavorite,
  };
});
