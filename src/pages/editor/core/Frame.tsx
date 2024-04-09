import React, { useEffect, useMemo } from 'react';
import { Frame, Leafer } from 'leafer-ui';
import * as helper from './tools/helper';
import { IFrame } from '@leafer-ui/interface';
import { BasePage } from './types/data';

export interface IFrameProps {
  data: BasePage;
  parent?: IFrame;
  children?: JSX.Element | JSX.Element[];
}

export default function FrameComp(props: IFrameProps) {
  const { width, height, background } = props.data;
  const frame = useMemo(() => {
    const fra = new Frame({ width, height, overflow: 'hide', fill: background });
    // console.log('fra', fra);
    fra.name = 'frame';
    props.parent.add(fra as any);
    return fra;
  }, []);

  useEffect(() => {
    frame.width = width;
    frame.height = height;
    frame.fill = background;
  }, [width, height, background]);

  useEffect(() => {
    return () => {
      frame.removeAll(true);
    };
  }, []);

  // 注入
  return <>{helper.childrenInjectProps({ parent: frame as any }, props.children)}</>;
}
