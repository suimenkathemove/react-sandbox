import styled from 'styled-components';

export const Img = styled.div<{
  url: string;
  imageWidth: number;
  height: number;
  duration: number;
}>`
  width: 100%;
  height: ${(props) => props.height}px;
  background-image: url(${(props) => props.url});
  background-repeat: repeat-x;
  background-size: auto ${(props) => props.height}px;
  animation: slide ${(props) => props.duration}s linear infinite;

  @keyframes slide {
    from {
      background-position-x: 0;
    }

    to {
      background-position-x: -${(props) => props.imageWidth}px;
    }
  }
`;
