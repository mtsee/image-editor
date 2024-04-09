import styles from './home.module.less';
import { Link } from 'react-router-dom';

interface IProps {
  ssrRes?: any; // 服务器渲染加载的数据
  location: { pathname: string; search: string; hash: string; state: any };
  history: History;
  match: { path: string; url: string; isExact: boolean; params: any };
  staticContext: { path: string; url: string; isExact: boolean; params: any };
  route: { path: string; ssr: boolean; exact: boolean; component: JSX.Element };
}

function Test(props: IProps) {
  console.log('test----------->>>>', props);

  return (
    <div className={styles.home} style={{ padding: 100 }}>
      test
      <Link to="/home">home</Link>
    </div>
  );
}

export default Test;
