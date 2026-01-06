import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  FlatList,
  Animated,
} from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight,
  MessageCircle,
  Heart,
} from 'lucide-react-native';
import * as Haptics from 'expo-haptics';
import Colors, { spacing, typography } from '@/constants/colors';
import { seriesData, formatNumber } from '@/mocks/webtoonData';
import { useUser } from '@/contexts/UserContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const IMAGE_HEIGHT = SCREEN_HEIGHT * 0.6;

const comicPanels = [
  'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1611457194403-d3f8c9fec7d1?w=800&h=1400&fit=crop',
  'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&h=1100&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=1200&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=1300&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=1150&fit=crop',
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=1250&fit=crop',
];

export default function ReaderScreen() {
  const { episodeId } = useLocalSearchParams<{ episodeId: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { markAsRead } = useUser();
  
  const [showControls, setShowControls] = useState(true);
  const [liked, setLiked] = useState(false);
  const [, setIsAtEnd] = useState(false);
  const controlsOpacity = useRef(new Animated.Value(1)).current;
  const flatListRef = useRef<FlatList>(null);

  const { series, episode, episodeIndex } = useMemo(() => {
    for (const s of seriesData) {
      const idx = s.episodes.findIndex(ep => ep.id === episodeId);
      if (idx !== -1) {
        return { series: s, episode: s.episodes[idx], episodeIndex: idx };
      }
    }
    return { series: null, episode: null, episodeIndex: -1 };
  }, [episodeId]);

  const hasNextEpisode = series && episodeIndex < series.episodes.length - 1;
  const hasPrevEpisode = episodeIndex > 0;

  useEffect(() => {
    if (episode) {
      markAsRead(episode.id);
    }
  }, [episode, markAsRead]);

  useEffect(() => {
    Animated.timing(controlsOpacity, {
      toValue: showControls ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [showControls, controlsOpacity]);

  const toggleControls = useCallback(() => {
    setShowControls(prev => !prev);
  }, []);

  const handleLike = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setLiked(prev => !prev);
  }, []);

  const goToNextEpisode = useCallback(() => {
    if (hasNextEpisode && series) {
      const nextEpisode = series.episodes[episodeIndex + 1];
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.replace(`/reader/${nextEpisode.id}` as any);
    }
  }, [hasNextEpisode, series, episodeIndex, router]);

  const goToPrevEpisode = useCallback(() => {
    if (hasPrevEpisode && series) {
      const prevEpisode = series.episodes[episodeIndex - 1];
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.replace(`/reader/${prevEpisode.id}` as any);
    }
  }, [hasPrevEpisode, series, episodeIndex, router]);

  const handleScroll = useCallback((event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isEnd = layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;
    setIsAtEnd(isEnd);
  }, []);

  const renderPanel = useCallback(({ item, index }: { item: string; index: number }) => (
    <TouchableOpacity 
      activeOpacity={1} 
      onPress={toggleControls}
      style={styles.panelContainer}
    >
      <Image
        source={{ uri: item }}
        style={styles.panelImage}
        contentFit="cover"
        transition={100}
      />
    </TouchableOpacity>
  ), [toggleControls]);

  if (!series || !episode) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Épisode introuvable</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" hidden={!showControls} />
      <Stack.Screen options={{ headerShown: false }} />
      
      <FlatList
        ref={flatListRef}
        data={comicPanels}
        renderItem={renderPanel}
        keyExtractor={(_, index) => `panel-${index}`}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
        ListFooterComponent={() => (
          <View style={styles.endContainer}>
            {hasNextEpisode ? (
              <TouchableOpacity 
                style={styles.nextEpisodeCard}
                onPress={goToNextEpisode}
              >
                <Text style={styles.nextEpisodeLabel}>Épisode suivant</Text>
                <Text style={styles.nextEpisodeTitle}>
                  Ep. {series.episodes[episodeIndex + 1].number} - {series.episodes[episodeIndex + 1].title}
                </Text>
                <View style={styles.nextEpisodeButton}>
                  <Text style={styles.nextEpisodeButtonText}>Continuer la lecture</Text>
                  <ChevronRight size={18} color={Colors.text.white} />
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.seriesEndCard}>
                <Text style={styles.seriesEndEmoji}>🎉</Text>
                <Text style={styles.seriesEndTitle}>Vous êtes à jour !</Text>
                <Text style={styles.seriesEndSubtitle}>
                  Revenez bientôt pour le prochain épisode
                </Text>
              </View>
            )}
          </View>
        )}
      />

      <Animated.View 
        style={[
          styles.topBar, 
          { 
            paddingTop: insets.top + spacing.sm,
            opacity: controlsOpacity,
          }
        ]}
        pointerEvents={showControls ? 'auto' : 'none'}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text.white} />
        </TouchableOpacity>
        <View style={styles.topBarInfo}>
          <Text style={styles.topBarTitle} numberOfLines={1}>{series.title}</Text>
          <Text style={styles.topBarEpisode}>Ep. {episode.number}</Text>
        </View>
        <View style={styles.topBarSpacer} />
      </Animated.View>

      <Animated.View 
        style={[
          styles.bottomBar,
          { 
            paddingBottom: insets.bottom + spacing.md,
            opacity: controlsOpacity,
          }
        ]}
        pointerEvents={showControls ? 'auto' : 'none'}
      >
        <TouchableOpacity 
          style={[styles.navButton, !hasPrevEpisode && styles.navButtonDisabled]}
          onPress={goToPrevEpisode}
          disabled={!hasPrevEpisode}
        >
          <ChevronLeft size={24} color={hasPrevEpisode ? Colors.text.white : Colors.text.muted} />
          <Text style={[styles.navButtonText, !hasPrevEpisode && styles.navButtonTextDisabled]}>
            Précédent
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomBarCenter}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Heart 
              size={22} 
              color={liked ? '#FF4D67' : Colors.text.white}
              fill={liked ? '#FF4D67' : 'transparent'}
            />
            <Text style={styles.actionButtonText}>{formatNumber(episode.likes + (liked ? 1 : 0))}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <MessageCircle size={22} color={Colors.text.white} />
            <Text style={styles.actionButtonText}>Commentaires</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={[styles.navButton, !hasNextEpisode && styles.navButtonDisabled]}
          onPress={goToNextEpisode}
          disabled={!hasNextEpisode}
        >
          <Text style={[styles.navButtonText, !hasNextEpisode && styles.navButtonTextDisabled]}>
            Suivant
          </Text>
          <ChevronRight size={24} color={hasNextEpisode ? Colors.text.white : Colors.text.muted} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.dark,
  },
  notFoundText: {
    ...typography.h2Section,
    color: Colors.text.muted,
  },
  scrollContent: {
    paddingBottom: 0,
  },
  panelContainer: {
    width: SCREEN_WIDTH,
  },
  panelImage: {
    width: SCREEN_WIDTH,
    height: IMAGE_HEIGHT,
  },
  topBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBarInfo: {
    flex: 1,
    alignItems: 'center',
  },
  topBarTitle: {
    ...typography.bodyRegular,
    color: Colors.text.white,
    fontWeight: '600',
  },
  topBarEpisode: {
    ...typography.captionMeta,
    color: Colors.text.muted,
    marginTop: 2,
  },
  topBarSpacer: {
    width: 40,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: spacing.sm,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    ...typography.captionMeta,
    color: Colors.text.white,
    fontWeight: '500',
  },
  navButtonTextDisabled: {
    color: Colors.text.muted,
  },
  bottomBarCenter: {
    flexDirection: 'row',
    gap: spacing.xl,
  },
  actionButton: {
    alignItems: 'center',
    gap: 4,
  },
  actionButtonText: {
    fontSize: 10,
    color: Colors.text.muted,
  },
  endContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  nextEpisodeCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: spacing.lg,
    alignItems: 'center',
  },
  nextEpisodeLabel: {
    ...typography.captionMeta,
    color: Colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  nextEpisodeTitle: {
    ...typography.h3Title,
    color: Colors.text.white,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  nextEpisodeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.brand.green,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: 25,
    marginTop: spacing.lg,
    gap: 4,
  },
  nextEpisodeButtonText: {
    ...typography.bodyRegular,
    color: Colors.text.white,
    fontWeight: '600',
  },
  seriesEndCard: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  seriesEndEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  seriesEndTitle: {
    ...typography.h2Section,
    color: Colors.text.white,
  },
  seriesEndSubtitle: {
    ...typography.bodyRegular,
    color: Colors.text.muted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
