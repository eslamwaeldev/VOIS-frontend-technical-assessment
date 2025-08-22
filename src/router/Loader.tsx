import { Suspense, type ComponentType, type JSX } from "react";

type ComponentSuspenseFunction = <P>(
  argument: ComponentType<P extends object ? unknown : unknown>
) => (props: object) => JSX.Element;

const ComponentSuspense: ComponentSuspenseFunction = (Component) => (props: object | undefined) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
};

const Loader = (Component: ComponentType<unknown>) => ComponentSuspense(Component);

export default Loader;
