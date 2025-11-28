import type { ReactNode } from "react";


interface CardProps {
  title?: string;
  children?: ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};
