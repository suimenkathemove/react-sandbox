import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  background-color: white;
`;

export type ConfirmDialogOption = {
  content: React.ReactNode;
  okText: string;
};

export type ConfirmDialogProps = {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
} & ConfirmDialogOption;

export const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
  return (
    <Overlay>
      <Container>
        {props.content}
        <div>
          <button onClick={props.onCancel}>キャンセル</button>
          <button onClick={props.onOk}>{props.okText}</button>
        </div>
      </Container>
    </Overlay>
  );
};

ConfirmDialog.displayName = 'ConfirmDialog';
