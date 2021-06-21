import { SmoothScrollTopOptions } from './types.js';

export const buttonDefaultStyles = (
  options?: SmoothScrollTopOptions
): string | undefined =>
  options &&
  `
  background-color: ${options.bgColor};
  color: ${options.color};
  position: fixed;
  bottom: 0;
  transform: translateY(105%);
  ${options.position === 'left' ? 'left: 15px;' : ''}
  ${options.position === 'right' ? 'right: 15px;' : ''}
  width: ${options.width};
  height: ${options.height};
  line-height: 2.5rem;
  text-align: center;
  cursor: pointer;
  transition: all .4s;
  border-radius: 3px 3px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
