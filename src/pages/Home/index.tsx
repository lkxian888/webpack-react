import Nav from '@/components/Nav';
import React, { FC } from 'react';
import { Button } from 'antd';
// import { Button as Btn } from 'antd-mobile';
import Btn from 'antd-mobile/es/components/button';
import styles from './index.scss';
import { useHistory } from 'react-router';
import map from '@/assets/images/homeBg.png';
import dlam from '../../assets/images/1.jpg';
import ThreeCom from '@/components/ThreeCom';

type IndexProps = {
  childer: Node;
};

const Home: FC<IndexProps> = () => {
  const history = useHistory();

  return (
    <div className={styles.homeWrap}>
      <Nav />
      <Button type="primary" onClick={() => history.push('/detail')}>
        detail 113111465
      </Button>
      <Btn color="primary">Btn</Btn>
      <img className={styles.imgbg} src={map} alt="" />
      {/* <img className={styles.dlam} src={dlam} alt="" /> */}
      <ThreeCom />
    </div>
  );
};

export default Home;
