import { View, StyleSheet } from 'react-native';
import type { PropsWithChildren } from 'react';

import Header from './Header';
import Footer from './Footer';

type Props = PropsWithChildren<{
  withHeader?: boolean;
  withFooter?: boolean;
}>;

const PageContainer = ({
  children,
  withHeader = true,
  withFooter = true,
}: Props) => {
  return (
    <View style={styles.container}>
      {withHeader && <Header />}
      <View style={styles.content}>{children}</View>
      {withFooter && <Footer />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
  },
});

export default PageContainer;