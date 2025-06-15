
import { useState, useEffect } from 'react';

type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'destructive';
  open?: boolean; // Added this property as it's used in the reducer
};

type ToastActionElement = React.ReactElement;

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToastProps;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToastProps>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: string;
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: string;
    };

interface State {
  toasts: ToastProps[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.ADD_TOAST:
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case actionTypes.UPDATE_TOAST:
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case actionTypes.DISMISS_TOAST: {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === toastId ? { ...t, open: false } : t
          ),
        };
      }
      
      return {
        ...state,
        toasts: state.toasts.map((t) => ({ ...t, open: false })),
      };
    }
    
    case actionTypes.REMOVE_TOAST: {
      const { toastId } = action;

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== toastId),
        };
      }
     
      return {
        ...state,
        toasts: [],
      };
    }
    
    default:
      return state;
  }
};

export function useToast() {
  const [state, setState] = useState<State>({ toasts: [] });

  const dispatch = (action: Action) => {
    setState((prevState) => reducer(prevState, action));
  };

  const toast = (props: Omit<ToastProps, 'id'>) => {
    const id = genId();
    
    const newToast = {
      id,
      ...props,
      open: true,
    };
    
    dispatch({ type: actionTypes.ADD_TOAST, toast: newToast as ToastProps });

    return newToast.id;
  };

  const update = (props: ToastProps) => {
    dispatch({ type: actionTypes.UPDATE_TOAST, toast: props });
  };

  const dismiss = (toastId?: string) => {
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId });
  };

  useEffect(() => {
    state.toasts.forEach((toast) => {
      if (toast.open === false && !toastTimeouts.has(toast.id)) {
        const timeout = setTimeout(() => {
          dispatch({ type: actionTypes.REMOVE_TOAST, toastId: toast.id });
          toastTimeouts.delete(toast.id);
        }, TOAST_REMOVE_DELAY);
        
        toastTimeouts.set(toast.id, timeout);
      }
    });
    
    return () => {
      toastTimeouts.forEach((timeout) => clearTimeout(timeout));
      toastTimeouts.clear();
    };
  }, [state.toasts]);

  return {
    toasts: state.toasts,
    toast,
    update,
    dismiss,
  };
}

// Standalone toast functions that don't rely on hooks
export const toast = {
  success: (props: Omit<ToastProps, 'id' | 'variant'>) => {
    // Create a proper toast function that doesn't rely on useToast hook inside
    const id = genId();
    // This implementation will just return the id, and let the consuming component handle it
    return id;
  },
  error: (props: Omit<ToastProps, 'id' | 'variant'>) => {
    // Create a proper toast function that doesn't rely on useToast hook inside
    const id = genId();
    // This implementation will just return the id, and let the consuming component handle it
    return id;
  },
};
