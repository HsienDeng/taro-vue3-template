export const pxCheck = (value) => {
  if (value !== undefined) {
    return isNaN(Number(value)) ? String(value) : `${value}px`;
  }
};
