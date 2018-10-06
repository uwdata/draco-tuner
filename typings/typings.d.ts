declare module "*.css" {
  interface IClassNames {
      [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module "worker-loader!*" {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
