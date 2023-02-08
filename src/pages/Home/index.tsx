/*
 * @Description: your description
 * @Author: lkxian
 * @@Email: lkxian888@163.com
 * @Date: 2021-09-18 14:39:46
 * @LastEditTime: 2022-07-06 11:08:00
 *
 */
import Nav from '@/components/Nav';
import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './index.scss';
import { useHistory } from 'react-router';
import map from '@/assets/images/homeBg.png';
import dlam from '../../assets/images/1.jpg';
import ThreeCom from '@/components/ThreeCom';

type IndexProps = {
  childer: Node;
};
console.log(process.env.NODE_ENV);

const Home: FC<IndexProps> = () => {
  const history = useHistory();

  return (
    <div className={styles.homeWrap}>
      <Nav />
      <Button type="primary" onClick={() => history.push('/detail')}>
        detail 113111465
      </Button>
      <div className={styles.imgbg} />
      {/* <img className={styles.dlam} src={dlam} alt="" /> */}
      {/* <ThreeCom /> */}
    </div>
  );
};

export default Home;
