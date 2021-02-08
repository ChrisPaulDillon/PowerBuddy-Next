import useDelayedRender from '../../hooks/util/useDelayedRender';

const DelayedRender = ({ delay, children }: any) => {
  return useDelayedRender(800 || delay)(() => children);
};

export default DelayedRender;
