import type { HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement>;

export function CodeInputContainer({ className, style, ...rest }: Props) {
  return (
    <div
      className={className}
      style={{
        ...style,
        position: 'relative',
      }}
      {...rest}
    />
  );
}
