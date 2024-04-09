import { observer } from 'mobx-react';
export interface IProps {}

function Animation(props: IProps) {
  return <div>animate</div>;
}

export default observer(Animation);
