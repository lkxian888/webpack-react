import React, { FC } from 'react';
import { Button } from 'antd';
import { useHistory } from 'react-router';
// import img from '../../assets/images/1.jpg';

const Detail: FC = () => {
  const history = useHistory();

  return (
    <div>
      <Button type="primary" onClick={() => history.push('/')}>
        返回首页
      </Button>
      {/* <img src={img} alt="" /> */}
    </div>
  );
};

export default Detail;
