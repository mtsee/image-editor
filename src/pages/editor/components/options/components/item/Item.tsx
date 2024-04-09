import styles from './item.module.less';
import classNames from 'classnames';

export interface IProps {
  title: string | JSX.Element;
  children?: any;
  className?: string;
  extra?: any;
  style?: Record<string, any>;
}

export default function Item(props: IProps) {
  const { className, title, children, extra, style } = props;
  return (
    <div className={classNames(styles.item, className)} style={{ ...(style || {}) }}>
      {title ? (
        <h2>
          <span>{title}</span>
          {extra}
        </h2>
      ) : null}
      <div className={styles.content}>{children ? children : null}</div>
    </div>
  );
}
