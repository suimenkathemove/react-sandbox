import { BalloonTail, Container } from './styles';

export type BalloonProps = {
  children: React.ReactNode;
};

export function Balloon(props: BalloonProps): ComponentReturn {
  return (
    <Container>
      <BalloonTail />
      {props.children}
    </Container>
  );
}
