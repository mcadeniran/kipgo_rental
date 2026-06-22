'use client';
import {FaGoogle, FaApple} from 'react-icons/fa';
import {Button} from '../ui/button';

export const Social = () => {
  return (
    <div className="relative flex items-center justify-center w-full gap-x-2">
      <Button size='lg' variant='outline' onClick={() => {}}>
        <FaGoogle className='h-5 w-5' />
      </Button>
      <Button size='lg' variant='outline' onClick={() => {}}>
        <FaApple className='h-5 w-5' />
      </Button>
    </div>
  );
};