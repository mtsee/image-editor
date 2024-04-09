import styles from './export.module.less';
import { observer } from 'mobx-react';
import { SendOne, Check } from '@icon-park/react';
import { useEffect, useState, useRef } from 'react';
import { Form, Button, Modal, Progress, Spin, Toast } from '@douyinfe/semi-ui';
import { editor } from '@stores/editor';
import { util } from '@utils/index';
// import classNames from 'classnames';

export interface IProps {}

function Export(props: IProps) {
  // const [visible, setVisible] = useState(false);
  return (
    <>
      <Button
        onClick={async () => {
          const base = await editor.store.capture();
          console.log(base);
          util.download(base.data, 'down');
          // setVisible(true)
        }}
        theme="solid"
        type="primary"
        className={styles.exportBtn}
        icon={<SendOne theme="filled" size="20" fill="#fff" />}
      >
        导出
      </Button>
    </>
  );
}

export default observer(Export);
