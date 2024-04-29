import { ComponentPropsWithRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavbarActions } from '../redux/slices/navbar';

import { Header, PagesNavigation } from '../componenst';

import styles from '../scss/index.module.scss';

type LayoutProps = ComponentPropsWithRef<'div'>;

const MainLayout = ({ children, ...props }: LayoutProps) => {
  const { ref: inViewRef, inView } = useInView();
  const { setInView } = useNavbarActions();

  const setRef = (node: HTMLElement) => {
    inViewRef(node);
  };

  useEffect(() => {
    inView && setInView(inView);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div className={styles.wrapper} {...props}>
      <PagesNavigation />
      <Header setRef={setRef} />
      <main className={styles.main_container}>{children}</main>
    </div>
  );
};

export default MainLayout;
