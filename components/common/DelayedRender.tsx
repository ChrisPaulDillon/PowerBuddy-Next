import useDelayedRender from '../../hooks/util/useDelayedRender';

const PbDelayedRender = ({ delay, children }: any) => {
  return useDelayedRender(800 || delay)(() => children);
};

export default PbDelayedRender;
