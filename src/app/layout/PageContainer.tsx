import { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import type { PropsWithChildren } from 'react';

import Header from './Header';
import Footer from './Footer';
import { useTheme } from '@/theme/hooks';
import type { ThemeColors } from '@/theme/theme';

type Props = PropsWithChildren<{
  withHeader?: boolean;
  withFooter?: boolean;
}>;

const PageContainer = ({
  children,
  withHeader = true,
  withFooter = true,
}: Props) => {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      {withHeader && <Header />}
      <View style={styles.content}>{children}</View>
      {withFooter && <Footer />}
    </View>
  );
};

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.screenBackground,
    },
    content: {
      flex: 1,
    },
  });

export default PageContainer;
