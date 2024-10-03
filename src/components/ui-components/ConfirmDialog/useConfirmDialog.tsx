import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { ConfirmDialog, ConfirmDialogOption } from '.';

type Confirm = (option: ConfirmDialogOption) => Promise<boolean>;

const ConfirmDialogContext = createContext<Confirm | null>(null);

interface ConfirmDialogProviderProps {
  children: React.ReactNode;
}

export const ConfirmDialogProvider: React.FC<ConfirmDialogProviderProps> = (
  props,
) => {
  const [option, setOption] = useState<ConfirmDialogOption | null>(null);

  const [open, setOpen] = useState(false);

  const resetState = useCallback(() => {
    setOpen(false);

    setTimeout(() => {
      setOption(null);
      // dialogが閉じるtransitionのduration
    }, 200);
  }, []);

  const resolveRef = useRef<(value: boolean) => void>(() => {});

  const confirm = useCallback<Confirm>(async (option) => {
    setOption(option);
    setOpen(true);

    return await new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  const onOk = useCallback(() => {
    resetState();

    resolveRef.current(true);
  }, [resetState]);

  const onCancel = useCallback(() => {
    resetState();

    resolveRef.current(false);
  }, [resetState]);

  return (
    <ConfirmDialogContext.Provider value={confirm}>
      {props.children}
      {option !== null &&
        createPortal(
          <ConfirmDialog
            onCancel={onCancel}
            onOk={onOk}
            open={open}
            {...option}
          />,
          document.body,
        )}
    </ConfirmDialogContext.Provider>
  );
};

export const useConfirmDialog = (): Confirm =>
  useContext(ConfirmDialogContext)!;
