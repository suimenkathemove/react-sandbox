import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Text1 = styled.p`
  position: absolute;
  animation: transition-text1 10s ease-in-out infinite;

  @keyframes transition-text1 {
    0% {
      opacity: 1;
    }
    10% {
      opacity: 1;
    }
    20% {
      opacity: 1;
    }
    30% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    60% {
      opacity: 0;
    }
    70% {
      opacity: 0;
    }
    80% {
      opacity: 0;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const Text2 = styled.p`
  position: absolute;
  animation: transition-text2 10s ease-in-out infinite;

  @keyframes transition-text2 {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    30% {
      opacity: 0;
    }
    40% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    80% {
      opacity: 0;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`;
