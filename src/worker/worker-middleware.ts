export const createWorkerMiddleware = (worker: Worker) => {
  return ({ dispatch }: any) => {
    worker.onmessage = ({ data: resultAction }) => {
      dispatch(resultAction);
    };

    return (next: any) => {
      return (action: any) => {
        if (action.meta && action.meta.useWorker) {
          worker.postMessage(action);
        }

        return next(action);
      };
    };
  };
};
