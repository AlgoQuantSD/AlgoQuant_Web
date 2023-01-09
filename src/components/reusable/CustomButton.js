import React from 'react';

function CustomButton(props) {
  const {
    children,
    className = '',
    rounded = false,
    color = 'gray',
    size = 'md',
    position = 'center',
  } = props;

  let classes = `text-${color} hover:text-${color}-dark focus:text-${color}-dark`;
  if (rounded) {
    classes += ' rounded-full';
  }
  classes += ` py-${size} px-${size}`;
  if (className) {
    classes += ` ${className}`;
  }

  return (
    <button className={classes}>
      {children}
    </button>
  );
}

export default CustomButton;