import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { BookOpen, Heart, Clock, Bell, ChevronRight } from 'lucide-react-native';
import Colors, { spacing, typography } from '@/constants/colors';
import { seriesData, formatDate } from '@/mocks/webtoonData';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'expo-router';

type MySeriesFilter = 'subscribed' | 'favorites' | 'recent';

export default function MySeriesScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { userState, isEpisodeRead } = useUser();
  const [activeFilter, setActiveFilter] = useState<MySeriesFilter>('subscribed');

  const subscribedSeries = useMemo(() => {
    return seriesData.filter(s => userState.subscribedSeries.includes(s.id));
  }, [userState.subscribedSeries]);

  const favoriteSeries = useMemo(() => {
    return seriesData.filter(s => userState.favorites.includes(s.id));
  }, [userState.favorites]);

  const recentlyRead = useMemo(() => {
    const readSeriesIds = [...new Set(userState.readHistory.map(ep => ep.split('_')[0]))];
    return seriesData.filter(s => readSeriesIds.includes(s.id));
  }, [userState.readHistory]);

  const currentSeries = activeFilter === 'subscribed' 
    ? subscribedSeries 
    : activeFilter === 'favorites' 
    ? favoriteSeries 
    : recentlyRead;

  const filters: { key: MySeriesFilter; label: string; icon: React.ReactNode; count: number }[] = [
    { key: 'subscribed', label: 'Abonnements', icon: <Bell size={18} color={activeFilter === 'subscribed' ? Colors.brand.green : Colors.text.secondary} />, count: subscribedSeries.length },
    { key: 'favorites', label: 'Favoris', icon: <Heart size={18} color={activeFilter === 'favorites' ? Colors.brand.green : Colors.text.secondary} />, count: favoriteSeries.length },
    { key: 'recent', label: 'Historique', icon: <Clock size={18} color={activeFilter === 'recent' ? Colors.brand.green : Colors.text.secondary} />, count: recentlyRead.length },
  ];

  const getUnreadCount = (seriesId: string) => {
    const series = seriesData.find(s => s.id === seriesId);
    if (!series) return 0;
    return series.episodes.filter(ep => !isEpisodeRead(ep.id)).length;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.headerTitle}>Mes Séries</Text>
        <Text style={styles.headerSubtitle}>Votre bibliothèque personnelle</Text>
      </View>

      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.key}
            style={[
              styles.filterTab,
              activeFilter === filter.key && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter(filter.key)}
          >
            {filter.icon}
            <Text style={[
              styles.filterTabText,
              activeFilter === filter.key && styles.filterTabTextActive,
            ]}>
              {filter.label}
            </Text>
            <View style={[
              styles.filterCount,
              activeFilter === filter.key && styles.filterCountActive,
            ]}>
              <Text style={[
                styles.filterCountText,
                activeFilter === filter.key && styles.filterCountTextActive,
              ]}>
                {filter.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {currentSeries.length === 0 ? (
          <View style={styles.emptyState}>
            <BookOpen size={64} color={Colors.text.muted} />
            <Text style={styles.emptyTitle}>Aucune série</Text>
            <Text style={styles.emptySubtitle}>
              {activeFilter === 'subscribed' 
                ? 'Abonnez-vous à des séries pour les retrouver ici'
                : activeFilter === 'favorites'
                ? 'Ajoutez des séries en favoris'
                : 'Commencez à lire pour voir votre historique'}
            </Text>
          </View>
        ) : (
          <View style={styles.seriesList}>
            {currentSeries.map((series) => {
              const unreadCount = getUnreadCount(series.id);
              const latestEpisode = series.episodes[series.episodes.length - 1];
              
              return (
                <TouchableOpacity
                  key={series.id}
                  style={styles.seriesCard}
                  activeOpacity={0.7}
                  onPress={() => router.push(`/series/${series.id}`)}
                >
                  <View style={styles.seriesImageContainer}>
                    <Image
                      source={{ uri: series.thumbnailUrl }}
                      style={styles.seriesImage}
                      contentFit="cover"
                    />
                    {unreadCount > 0 && (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadText}>{unreadCount}</Text>
                      </View>
                    )}
                  </View>
                  
                  <View style={styles.seriesInfo}>
                    <Text style={styles.seriesTitle} numberOfLines={1}>{series.title}</Text>
                    <Text style={styles.seriesAuthor}>{series.author}</Text>
                    <View style={styles.seriesMeta}>
                      <Text style={styles.seriesEpisode}>Ep. {latestEpisode?.number}</Text>
                      <Text style={styles.seriesDate}>{formatDate(latestEpisode?.uploadDate || '')}</Text>
                    </View>
                    {unreadCount > 0 && (
                      <View style={styles.newBadge}>
                        <Text style={styles.newBadgeText}>{unreadCount} nouveau{unreadCount > 1 ? 'x' : ''}</Text>
                      </View>
                    )}
                  </View>
                  
                  <ChevronRight size={20} color={Colors.text.muted} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        <View style={{ height: 120 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: Colors.background.main,
  },
  headerTitle: {
    ...typography.h1Hero,
    fontSize: 28,
  },
  headerSubtitle: {
    ...typography.bodyRegular,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    gap: spacing.md,
  },
  filterTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    gap: 6,
    borderRadius: 8,
    backgroundColor: Colors.background.surface,
  },
  filterTabActive: {
    backgroundColor: 'rgba(0, 220, 100, 0.1)',
  },
  filterTabText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  filterTabTextActive: {
    color: Colors.brand.green,
  },
  filterCount: {
    backgroundColor: Colors.background.main,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  filterCountActive: {
    backgroundColor: Colors.brand.green,
  },
  filterCountText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.secondary,
  },
  filterCountTextActive: {
    color: Colors.text.white,
  },
  content: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.h2Section,
    marginTop: spacing.lg,
  },
  emptySubtitle: {
    ...typography.bodyRegular,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  seriesList: {
    padding: spacing.lg,
  },
  seriesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  seriesImageContainer: {
    position: 'relative',
  },
  seriesImage: {
    width: 70,
    height: 95,
    borderRadius: 4,
  },
  unreadBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: Colors.brand.green,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.text.white,
  },
  seriesInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  seriesTitle: {
    ...typography.bodyRegular,
    fontWeight: '600',
  },
  seriesAuthor: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  seriesMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: spacing.sm,
  },
  seriesEpisode: {
    fontSize: 12,
    color: Colors.text.primary,
    fontWeight: '500',
  },
  seriesDate: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  newBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 220, 100, 0.15)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  newBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.brand.green,
  },
});
