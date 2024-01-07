export const buildContextLog = (context: string, funcName?: string): string => {
  if (funcName) {
    return `${context}.${funcName}`;
  }

  return context;
};
