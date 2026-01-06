import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Heart } from 'lucide-react-native';
import { Image } from 'expo-image';
import Colors, { spacing, typography } from '@/constants/colors';
import { seriesData, genres, formatNumber } from '@/mocks/webtoonData';

export default function GenreDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams();
  
  const genre = genres.find(g => g.id === id);
  const filteredSeries = seriesData.filter(
    s => s.genre.toLowerCase() === (id as string).toLowerCase()
  );

  const renderSeriesItem = ({ item }: { item: typeof seriesData[0] }) => (
    <TouchableOpacity
      style={styles.seriesCard}
      onPress={() => router.push(`/series/${item.id}`)}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.thumbnailUrl }}
        style={styles.seriesThumbnail}
        contentFit="cover"
      />
      <View style={styles.seriesInfo}>
        <Text style={styles.seriesTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.seriesAuthor} numberOfLines={1}>
          {item.author}
        </Text>
        <View style={styles.seriesMeta}>
          <Text style={styles.seriesGenre}>{item.genre}</Text>
          <View style={styles.seriesLikes}>
            <Heart size={12} color={Colors.brand.green} fill={Colors.brand.green} />
            <Text style={styles.seriesLikesText}>{formatNumber(item.totalLikes)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + spacing.md }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{genre?.name || 'Genre'}</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.genreHeader}>
        <Text style={styles.genreIcon}>{genre?.icon}</Text>
        <Text style={styles.genreCount}>
          {filteredSeries.length} série{filteredSeries.length > 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={filteredSeries}
        renderItem={renderSeriesItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: Colors.background.main,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
    padding: spacing.xs,
  },
  headerTitle: {
    ...typography.h3Title,
  },
  genreHeader: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    backgroundColor: Colors.background.surface,
  },
  genreIcon: {
    fontSize: 48,
    marginBottom: spacing.sm,
  },
  genreCount: {
    ...typography.bodyRegular,
    color: Colors.text.secondary,
  },
  listContent: {
    padding: spacing.md,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  seriesCard: {
    width: '31.5%',
    marginBottom: spacing.md,
  },
  seriesThumbnail: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 4,
    backgroundColor: Colors.background.surface,
  },
  seriesInfo: {
    marginTop: spacing.xs,
  },
  seriesTitle: {
    ...typography.bodyRegular,
    fontSize: 13,
    fontWeight: '600' as const,
    marginBottom: 2,
  },
  seriesAuthor: {
    ...typography.captionMeta,
    color: Colors.text.secondary,
    fontSize: 11,
    marginBottom: 4,
  },
  seriesMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  seriesGenre: {
    ...typography.captionMeta,
    fontSize: 10,
    color: Colors.text.secondary,
  },
  seriesLikes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seriesLikesText: {
    ...typography.captionMeta,
    fontSize: 10,
    color: Colors.brand.green,
  },
});
