import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
  StatusBar,
  Platform,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, Search, Heart } from 'lucide-react-native';
import Colors, { spacing, typography } from '@/constants/colors';
import { seriesData, formatNumber, Series } from '@/mocks/webtoonData';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const HERO_HEIGHT = SCREEN_HEIGHT * 0.45;

type FilterType = 'trending' | 'popular' | 'new';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState<FilterType>('trending');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const bannerRef = useRef<FlatList>(null);

  const topSeries = seriesData.slice(0, 5);
  const rankedSeries = seriesData.filter(s => s.rank).sort((a, b) => (a.rank || 0) - (b.rank || 0));
  const recommendedSeries = seriesData;

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentBannerIndex + 1) % topSeries.length;
      setCurrentBannerIndex(nextIndex);
      bannerRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentBannerIndex, topSeries.length]);

  const navigateToSeries = useCallback((seriesId: string) => {
    router.push(`/series/${seriesId}`);
  }, [router]);

  const renderHeroBanner = ({ item, index }: { item: Series; index: number }) => (
    <TouchableOpacity 
      activeOpacity={0.9}
      onPress={() => navigateToSeries(item.id)}
      style={styles.heroSlide}
    >
      <Image
        source={{ uri: item.bannerUrl }}
        style={styles.heroImage}
        contentFit="cover"
        transition={300}
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.heroGradient}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroGenre}>{item.genre.toUpperCase()}</Text>
          <Text style={styles.heroTitle}>{item.title}</Text>
          <Text style={styles.heroAuthor}>par {item.author}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderPaginationDots = () => (
    <View style={styles.paginationContainer}>
      {topSeries.map((_, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            index === currentBannerIndex && styles.paginationDotActive,
          ]}
        />
      ))}
    </View>
  );

  const renderRankingItem = ({ item, index }: { item: Series; index: number }) => (
    <TouchableOpacity
      style={styles.rankingCard}
      activeOpacity={0.8}
      onPress={() => navigateToSeries(item.id)}
    >
      <View style={styles.rankingImageContainer}>
        <Image
          source={{ uri: item.thumbnailUrl }}
          style={styles.rankingImage}
          contentFit="cover"
          transition={200}
        />
        <View style={styles.rankingNumberContainer}>
          <Text style={styles.rankingNumber}>{index + 1}</Text>
        </View>
      </View>
      <Text style={styles.rankingTitle} numberOfLines={2}>{item.title}</Text>
      <Text style={styles.rankingGenre}>{item.genre}</Text>
    </TouchableOpacity>
  );

  const renderGridItem = ({ item }: { item: Series }) => (
    <TouchableOpacity
      style={styles.gridCard}
      activeOpacity={0.8}
      onPress={() => navigateToSeries(item.id)}
    >
      <View style={styles.gridImageContainer}>
        <Image
          source={{ uri: item.thumbnailUrl }}
          style={styles.gridImage}
          contentFit="cover"
          transition={200}
        />
      </View>
      <View style={styles.gridInfo}>
        <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.gridAuthor} numberOfLines={1}>{item.author}</Text>
        <View style={styles.gridMeta}>
          <Heart size={12} color={Colors.brand.green} fill={Colors.brand.green} />
          <Text style={styles.gridLikes}>{formatNumber(item.totalLikes)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const filters: { key: FilterType; label: string }[] = [
    { key: 'trending', label: 'Tendance' },
    { key: 'popular', label: 'Populaire' },
    { key: 'new', label: 'Nouveauté' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        <View style={styles.heroSection}>
          <FlatList
            ref={bannerRef}
            data={topSeries}
            renderItem={renderHeroBanner}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
              setCurrentBannerIndex(index);
            }}
          />
          {renderPaginationDots()}
          
          <View style={[styles.headerOverlay, { paddingTop: insets.top + 8 }]}>
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Webtoon_logo_%282021_2%29.png' }}
              style={styles.logo}
              contentFit="contain"
            />
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Search size={24} color={Colors.text.white} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Bell size={24} color={Colors.text.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.stickyFilterContainer}>
          <View style={styles.filterBar}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  activeFilter === filter.key && styles.filterButtonActive,
                ]}
                onPress={() => setActiveFilter(filter.key)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter.key && styles.filterTextActive,
                  ]}
                >
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔥 Ranking</Text>
          <FlatList
            data={rankedSeries}
            renderItem={renderRankingItem}
            keyExtractor={(item) => `rank-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rankingList}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✨ Recommandés pour vous</Text>
          <View style={styles.gridContainer}>
            {recommendedSeries.map((item) => (
              <View key={`grid-${item.id}`} style={styles.gridItemWrapper}>
                {renderGridItem({ item })}
              </View>
            ))}
          </View>
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
  heroSection: {
    height: HERO_HEIGHT,
    position: 'relative',
  },
  heroSlide: {
    width: SCREEN_WIDTH,
    height: HERO_HEIGHT,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl + 20,
  },
  heroContent: {
    gap: 4,
  },
  heroGenre: {
    color: Colors.brand.green,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  heroTitle: {
    color: Colors.text.white,
    ...typography.h1Hero,
    fontSize: 26,
  },
  heroAuthor: {
    color: Colors.text.muted,
    fontSize: 14,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  logo: {
    width: 120,
    height: 30,
    tintColor: Colors.text.white,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  paginationDotActive: {
    backgroundColor: Colors.text.white,
    width: 18,
  },
  stickyFilterContainer: {
    backgroundColor: Colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  filterBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.lg,
  },
  filterButton: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  filterButtonActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.brand.green,
  },
  filterText: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  filterTextActive: {
    color: Colors.text.primary,
  },
  section: {
    marginTop: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2Section,
    marginBottom: spacing.md,
  },
  rankingList: {
    paddingRight: spacing.lg,
    gap: spacing.md,
  },
  rankingCard: {
    width: 130,
    marginRight: spacing.sm,
  },
  rankingImageContainer: {
    position: 'relative',
    width: 130,
    height: 175,
    borderRadius: 4,
    overflow: 'hidden',
  },
  rankingImage: {
    width: '100%',
    height: '100%',
  },
  rankingNumberContainer: {
    position: 'absolute',
    bottom: -8,
    left: -4,
  },
  rankingNumber: {
    fontSize: 72,
    fontWeight: '900',
    color: Colors.text.white,
    textShadowColor: Colors.text.primary,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
    ...Platform.select({
      web: {
        WebkitTextStroke: '2px #000',
      },
    }),
  },
  rankingTitle: {
    marginTop: spacing.sm,
    ...typography.bodyRegular,
    fontWeight: '600',
  },
  rankingGenre: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  gridItemWrapper: {
    width: '33.33%',
    paddingHorizontal: spacing.xs,
    marginBottom: spacing.lg,
  },
  gridCard: {
    flex: 1,
  },
  gridImageContainer: {
    aspectRatio: 3 / 4,
    borderRadius: 4,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  gridInfo: {
    marginTop: spacing.sm,
  },
  gridTitle: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  gridAuthor: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  gridMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  gridLikes: {
    fontSize: 11,
    color: Colors.text.secondary,
  },
});
