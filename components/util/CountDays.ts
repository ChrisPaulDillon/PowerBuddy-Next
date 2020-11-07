export const CountDays = (
  monChecked: boolean,
  tueChecked: boolean,
  wedChecked: boolean,
  thuChecked: boolean,
  friChecked: boolean,
  satChecked: boolean,
  sunChecked: boolean
) => {
  let counter = 0;
  if (monChecked) counter++;
  if (tueChecked) counter++;
  if (wedChecked) counter++;
  if (thuChecked) counter++;
  if (friChecked) counter++;
  if (satChecked) counter++;
  if (sunChecked) counter++;
  return counter;
};
