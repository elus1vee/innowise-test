export enum Breakpoints {
  SM = "358px",
  LR = "904px",
  XLR = "1280px",
}

export const Devices = {
  sm: `(min-width: ${Breakpoints.SM})`,
  lr: `(min-width: ${Breakpoints.LR})`,
  xlr: `(min-width: ${Breakpoints.XLR})`,
};

export enum BreakpointsMain {
  SM = "390px",
  LR = "1024px",
  XLR = "1440px",
}

export const DevicesMain = {
  sm: `(max-width: ${BreakpointsMain.SM})`,
  lr: `(max-width: ${BreakpointsMain.LR})`,
  xlr: `(max-width: ${BreakpointsMain.XLR})`,
};
