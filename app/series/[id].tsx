import React, { useMemo, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  Star, 
  Users,
  ThumbsUp,
  ChevronRight,
  BookOpen,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors, { spacing, typography } from '@/constants/colors';
import { seriesData, formatNumber, formatDate, Episode } from '@/mocks/webtoonData';
import { useUser } from '@/contexts/UserContext';

const HEADER_HEIGHT = 320;

export default function SeriesDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isEpisodeRead, isSeriesSubscribed, isSeriesFavorite, toggleSubscription, toggleFavorite, markAsRead } = useUser();

  const series = useMemo(() => {
    return seriesData.find(s => s.id === id);
  }, [id]);

  const isSubscribed = useMemo(() => {
    return series ? isSeriesSubscribed(series.id) : false;
  }, [series, isSeriesSubscribed]);

  const isFavorite = useMemo(() => {
    return series ? isSeriesFavorite(series.id) : false;
  }, [series, isSeriesFavorite]);

  const handleSubscribe = useCallback(() => {
    if (series) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      toggleSubscription(series.id);
    }
  }, [series, toggleSubscription]);

  const handleFavorite = useCallback(() => {
    if (series) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      toggleFavorite(series.id);
    }
  }, [series, toggleFavorite]);

  const handleReadEpisode = useCallback((episode: Episode) => {
    if (series) {
      markAsRead(episode.id);
      router.push(`/reader/${episode.id}` as any);
    }
  }, [series, markAsRead, router]);

  const handleReadFirst = useCallback(() => {
    if (series && series.episodes.length > 0) {
      const firstEpisode = series.episodes[0];
      handleReadEpisode(firstEpisode);
    }
  }, [series, handleReadEpisode]);

  if (!series) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Série introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Stack.Screen options={{ headerShown: false }} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: series.bannerUrl }}
            style={styles.bannerImage}
            contentFit="cover"
            blurRadius={3}
          />
          <LinearGradient
            colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.8)', Colors.background.main]}
            style={styles.headerGradient}
          />
          
          <View style={[styles.headerActions, { paddingTop: insets.top + spacing.sm }]}>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ArrowLeft size={24} color={Colors.text.white} />
            </TouchableOpacity>
            <View style={styles.headerActionsRight}>
              <TouchableOpacity style={styles.headerButton} onPress={handleFavorite}>
                <Heart 
                  size={24} 
                  color={isFavorite ? '#FF4D67' : Colors.text.white}
                  fill={isFavorite ? '#FF4D67' : 'transparent'}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Share2 size={24} color={Colors.text.white} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.seriesInfo}>
            <Image
              source={{ uri: series.thumbnailUrl }}
              style={styles.thumbnail}
              contentFit="cover"
            />
            <View style={styles.titleContainer}>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{series.status}</Text>
              </View>
              <Text style={styles.title}>{series.title}</Text>
              <Text style={styles.author}>par {series.author}</Text>
              <View style={styles.ratingContainer}>
                <Star size={16} color={Colors.brand.green} fill={Colors.brand.green} />
                <Text style={styles.rating}>{series.rating.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Users size={18} color={Colors.text.secondary} />
            <Text style={styles.statValue}>{formatNumber(series.subscribers)}</Text>
            <Text style={styles.statLabel}>Abonnés</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <ThumbsUp size={18} color={Colors.text.secondary} />
            <Text style={styles.statValue}>{formatNumber(series.totalLikes)}</Text>
            <Text style={styles.statLabel}>Likes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <BookOpen size={18} color={Colors.text.secondary} />
            <Text style={styles.statValue}>{series.episodes.length}</Text>
            <Text style={styles.statLabel}>Épisodes</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.subscribeButton, isSubscribed && styles.subscribedButton]}
            onPress={handleSubscribe}
          >
            <Text style={[styles.subscribeButtonText, isSubscribed && styles.subscribedButtonText]}>
              {isSubscribed ? '✓ Abonné' : '+ S\'abonner'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.readButton}
            onPress={handleReadFirst}
          >
            <Text style={styles.readButtonText}>Lire le 1er épisode</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.synopsisContainer}>
          <Text style={styles.sectionTitle}>Synopsis</Text>
          <Text style={styles.synopsis}>{series.synopsis}</Text>
          <View style={styles.genreTag}>
            <Text style={styles.genreTagText}>{series.genre}</Text>
          </View>
        </View>

        <View style={styles.episodesContainer}>
          <View style={styles.episodesHeader}>
            <Text style={styles.sectionTitle}>Épisodes</Text>
            <Text style={styles.episodeCount}>{series.episodes.length} épisodes</Text>
          </View>
          
          {series.episodes.map((episode) => {
            const isRead = isEpisodeRead(episode.id);
            return (
              <TouchableOpacity
                key={episode.id}
                style={styles.episodeItem}
                activeOpacity={0.7}
                onPress={() => handleReadEpisode(episode)}
              >
                <Image
                  source={{ uri: episode.thumbnailUrl }}
                  style={styles.episodeThumbnail}
                  contentFit="cover"
                />
                <View style={styles.episodeInfo}>
                  <Text style={[styles.episodeTitle, isRead && styles.episodeTitleRead]}>
                    Ep. {episode.number} - {episode.title}
                  </Text>
                  <View style={styles.episodeMeta}>
                    <Text style={styles.episodeDate}>{formatDate(episode.uploadDate)}</Text>
                    <View style={styles.episodeLikes}>
                      <ThumbsUp size={12} color={Colors.text.secondary} />
                      <Text style={styles.episodeLikesText}>{formatNumber(episode.likes)}</Text>
                    </View>
                  </View>
                  {isRead && (
                    <View style={styles.readBadge}>
                      <Text style={styles.readBadgeText}>Lu</Text>
                    </View>
                  )}
                </View>
                <ChevronRight size={20} color={Colors.text.muted} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  scrollView: {
    flex: 1,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.main,
  },
  notFoundText: {
    ...typography.h2Section,
    color: Colors.text.secondary,
  },
  headerContainer: {
    height: HEADER_HEIGHT,
    position: 'relative',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  headerGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  headerActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    zIndex: 10,
  },
  headerActionsRight: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seriesInfo: {
    position: 'absolute',
    bottom: -60,
    left: spacing.lg,
    right: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  thumbnail: {
    width: 100,
    height: 140,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: Colors.background.main,
  },
  titleContainer: {
    flex: 1,
    marginLeft: spacing.md,
    paddingBottom: spacing.sm,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.status.ongoing,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.white,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h1Hero,
    color: Colors.text.primary,
  },
  author: {
    ...typography.bodyRegular,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.xs,
  },
  rating: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.brand.green,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.xl,
    marginTop: 70,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
    marginHorizontal: spacing.lg,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h3Title,
    marginTop: spacing.xs,
  },
  statLabel: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border.light,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  subscribeButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.text.secondary,
    alignItems: 'center',
  },
  subscribedButton: {
    borderColor: Colors.brand.green,
    backgroundColor: 'rgba(0, 220, 100, 0.1)',
  },
  subscribeButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text.primary,
  },
  subscribedButtonText: {
    color: Colors.brand.green,
  },
  readButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: Colors.brand.green,
    alignItems: 'center',
  },
  readButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text.white,
  },
  synopsisContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  sectionTitle: {
    ...typography.h2Section,
    marginBottom: spacing.sm,
  },
  synopsis: {
    ...typography.bodyRegular,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  genreTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.background.surface,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginTop: spacing.md,
  },
  genreTagText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.text.secondary,
  },
  episodesContainer: {
    paddingTop: spacing.lg,
  },
  episodesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  episodeCount: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
  },
  episodeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  episodeThumbnail: {
    width: 80,
    height: 55,
    borderRadius: 4,
  },
  episodeInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  episodeTitle: {
    ...typography.bodyRegular,
    fontWeight: '500',
  },
  episodeTitleRead: {
    color: Colors.text.muted,
  },
  episodeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: spacing.md,
  },
  episodeDate: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
  },
  episodeLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  episodeLikesText: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
  },
  readBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.background.surface,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 4,
  },
  readBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.text.muted,
  },
});
