import {
  ComponentType,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react';

type SegmentState = 'default' | 'focused' | 'filled';

interface SegmentProps {
  state: SegmentState;
  children?: ReactNode;
}

export type SegmentComponentType = ComponentType<SegmentProps>;
export type SegmentContainerComponentType = ComponentType<PropsWithChildren>;

type BaseInput = Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'className' | 'maxLength' | 'value' | 'style'>;

interface Props extends BaseInput {
  length: number;
  Segment: SegmentComponentType;
  SegmentContainer: SegmentContainerComponentType;
  type?: 'text' | 'password';
  value?: string;
}

export const CodeInput = 
  (
    { length, Segment, SegmentContainer, value, onChange, onFocus, onBlur, type, ...rest }: Props,
  ) => {
    const [enteredText, setEnteredText] = useState<string>(value || '');
    const [hasInputFocus, setHasInputFocus] = useState<boolean>(false);

    function getSegmentState(segmentIndex: number): SegmentState {
      if (enteredText.length === segmentIndex && hasInputFocus) {
        return 'focused';
      }

      if (enteredText.length > segmentIndex) {
        return 'filled';
      }

      return 'default';
    }

    return (
      <>
        <SegmentContainer>
          {new Array(length).fill(null).map((_, index) => (
            <Segment key={index} state={getSegmentState(index)}>
              {enteredText[index]}
            </Segment>
          ))}
        </SegmentContainer>
        <input
          type={type ?? 'text'}
          maxLength={length}
          value={enteredText}
          onFocus={(e) => {
            setHasInputFocus(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setHasInputFocus(false);
            onBlur?.(e);
          }}
          onChange={(e) => {
            setEnteredText(e.target.value);
            onChange?.(e);
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            zIndex: 1,
          }}
          {...rest}
        />
      </>
    );
  };
