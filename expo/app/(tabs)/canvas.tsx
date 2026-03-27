import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Star, TrendingUp, Clock, Award } from 'lucide-react-native';
import Colors, { spacing, typography } from '@/constants/colors';
import { seriesData, formatNumber } from '@/mocks/webtoonData';
import { useRouter } from 'expo-router';

const { width: screenWidth } = Dimensions.get('window');

type CanvasFilter = 'popular' | 'trending' | 'new' | 'challenge';

export default function CanvasScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<CanvasFilter>('popular');

  const canvasFilters: { key: CanvasFilter; label: string; icon: React.ReactNode }[] = [
    { key: 'popular', label: 'Populaire', icon: <Star size={16} color={activeFilter === 'popular' ? Colors.text.white : Colors.text.secondary} /> },
    { key: 'trending', label: 'Tendance', icon: <TrendingUp size={16} color={activeFilter === 'trending' ? Colors.text.white : Colors.text.secondary} /> },
    { key: 'new', label: 'Nouveau', icon: <Clock size={16} color={activeFilter === 'new' ? Colors.text.white : Colors.text.secondary} /> },
    { key: 'challenge', label: 'Challenge', icon: <Award size={16} color={activeFilter === 'challenge' ? Colors.text.white : Colors.text.secondary} /> },
  ];

  const canvasSeries = seriesData.slice(0, 6);

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <Text style={styles.headerTitle}>Canvas</Text>
        <Text style={styles.headerSubtitle}>Créations indépendantes</Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {canvasFilters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterChip,
                activeFilter === filter.key && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter.key)}
            >
              {filter.icon}
              <Text style={[
                styles.filterChipText,
                activeFilter === filter.key && styles.filterChipTextActive,
              ]}>
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>🌟 Sélection de l&apos;éditeur</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {canvasSeries.slice(0, 3).map((series) => (
              <TouchableOpacity
                key={series.id}
                style={styles.featuredCard}
                activeOpacity={0.8}
                onPress={() => router.push(`/series/${series.id}`)}
              >
                <Image
                  source={{ uri: series.bannerUrl }}
                  style={styles.featuredImage}
                  contentFit="cover"
                />
                <View style={styles.featuredOverlay}>
                  <View style={styles.featuredBadge}>
                    <Text style={styles.featuredBadgeText}>CANVAS PICK</Text>
                  </View>
                  <Text style={styles.featuredTitle}>{series.title}</Text>
                  <Text style={styles.featuredAuthor}>{series.author}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.sectionTitle}>📚 Toutes les séries</Text>
          {canvasSeries.map((series, index) => (
            <TouchableOpacity
              key={series.id}
              style={styles.listItem}
              activeOpacity={0.7}
              onPress={() => router.push(`/series/${series.id}`)}
            >
              <Text style={styles.listRank}>{index + 1}</Text>
              <Image
                source={{ uri: series.thumbnailUrl }}
                style={styles.listImage}
                contentFit="cover"
              />
              <View style={styles.listInfo}>
                <Text style={styles.listTitle} numberOfLines={1}>{series.title}</Text>
                <Text style={styles.listAuthor}>{series.author}</Text>
                <View style={styles.listMeta}>
                  <Text style={styles.listGenre}>{series.genre}</Text>
                  <Text style={styles.listDot}>•</Text>
                  <Text style={styles.listLikes}>{formatNumber(series.subscribers)} abonnés</Text>
                </View>
              </View>
              <View style={styles.listRating}>
                <Star size={14} color={Colors.brand.green} fill={Colors.brand.green} />
                <Text style={styles.listRatingText}>{series.rating.toFixed(1)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

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
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  filterScroll: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: 20,
    backgroundColor: Colors.background.surface,
    marginRight: spacing.sm,
    gap: 6,
  },
  filterChipActive: {
    backgroundColor: Colors.brand.green,
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  filterChipTextActive: {
    color: Colors.text.white,
  },
  content: {
    flex: 1,
  },
  featuredSection: {
    paddingTop: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2Section,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  featuredCard: {
    width: screenWidth * 0.75,
    height: 180,
    marginLeft: spacing.lg,
    borderRadius: 12,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.background.overlay,
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  featuredBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.brand.green,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  featuredBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.white,
  },
  featuredTitle: {
    ...typography.h3Title,
    color: Colors.text.white,
  },
  featuredAuthor: {
    ...typography.captionMeta,
    color: Colors.text.muted,
    marginTop: 2,
  },
  listSection: {
    paddingTop: spacing.xl,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  listRank: {
    width: 24,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text.secondary,
  },
  listImage: {
    width: 50,
    height: 65,
    borderRadius: 4,
  },
  listInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  listTitle: {
    ...typography.bodyRegular,
    fontWeight: '600',
  },
  listAuthor: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  listMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  listGenre: {
    fontSize: 11,
    color: Colors.brand.green,
    fontWeight: '500',
  },
  listDot: {
    fontSize: 11,
    color: Colors.text.muted,
    marginHorizontal: 4,
  },
  listLikes: {
    fontSize: 11,
    color: Colors.text.secondary,
  },
  listRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listRatingText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text.primary,
  },
});
