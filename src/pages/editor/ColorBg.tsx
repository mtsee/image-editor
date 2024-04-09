import styles from './editor.module.less';

export interface IProps {
  style: {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
  };
}

export default function ColorBg(props: IProps) {
  return (
    <div className={styles.colorbg} style={{ ...props.style }}>
      <span className={styles.box1}></span>
      <span className={styles.box2}></span>
    </div>
  );
}
