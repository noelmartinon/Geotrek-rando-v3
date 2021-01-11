import React from 'react';
import { slide as Slide } from 'react-burger-menu';

import { Cross } from 'components/Icons/Cross';
import BurgerMenuSection from 'components/BurgerMenuSection/BurgerMenuSection';

interface Props {
  menuState: 'DISPLAYED' | 'HIDDEN';
  handleClose: () => void;
  title: React.ReactNode;
  filtersList: string[];
}

export const MobileFilterMenu: React.FC<Props> = ({
  menuState,
  handleClose,
  title,
  filtersList: filtersList,
}) => {
  return (
    <Slide
      isOpen={menuState === 'DISPLAYED'}
      onClose={handleClose}
      right
      customBurgerIcon={false}
      customCrossIcon={<Cross size={14} className="mt-3" />}
      burgerButtonClassName="fixed w-6 h-6 top-2.5 right-2.5"
      burgerBarClassName="bg-white"
      menuClassName="bg-white p-4"
      crossButtonClassName="left-5"
      crossClassName="bg-greyDarkColored"
    >
      <span className="pb-4 font-bold text-center border-b border-solid border-greySoft outline-none">
        {title}
      </span>
      {filtersList.map(section => (
        <BurgerMenuSection title={section} key={section} />
      ))}
    </Slide>
  );
};
