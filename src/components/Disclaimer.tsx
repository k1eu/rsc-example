import { PropsWithChildren } from "react";

const Disclaimer = ({ children }: PropsWithChildren<{}>) => {
  return (
    <section className="absolute top-0 left-1/2 -translate-x-1/2">
      <p>{children}</p>
    </section>
  );
};

export default Disclaimer;
