import React from 'react';

interface CloseIconProps {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default ({ className, onClick }: CloseIconProps): React.ReactElement => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height="28"
      viewBox="0 0 24 24"
      width="28"
      onClick={onClick}
    >
      <path
        fill="currentcolor"
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
      />
    </svg>
  );
};
