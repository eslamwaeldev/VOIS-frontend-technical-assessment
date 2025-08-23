import { Suspense, type ComponentType, type JSX } from "react";
import LoadingPage from "../pages/LoadingPage";

type ComponentSuspenseFunction = <P>(
  argument: ComponentType<P extends object ? unknown : unknown>
) => (props: object) => JSX.Element;

const ComponentSuspense: ComponentSuspenseFunction = (Component) => (props: object | undefined) => {
  return (
    <Suspense fallback={LoadingPage()}>
      <Component {...props} />
    </Suspense>
  );
};

const Loader = (Component: ComponentType<unknown>) => ComponentSuspense(Component);

export default Loader;
