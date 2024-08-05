'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React, { JSXElementConstructor, ReactElement, useState } from 'react';
import { Button } from '../../../../components/ui/button';
import { Plus } from 'lucide-react';

type AnimatedAddInputProps = {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
  name: string;
};

const AnimatedAddInput = ({ children, name }: AnimatedAddInputProps) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <div>
        {!isClicked && (
          <Button
            type='button'
            onClick={() => setIsClicked(true)}
            variant={'link'}
          >
            <Plus size={14} className='mr-1' /> {name}
          </Button>
        )}
      </div>
      <AnimatePresence>
        {isClicked && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.2 }}
            layout
          >
            {React.cloneElement(children, { setIsClicked })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedAddInput;
