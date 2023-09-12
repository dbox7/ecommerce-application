import { toast } from 'react-toastify';
import { IToastify } from '../utils/types';

export default function useToastify() {

  const notify =  (message: IToastify) => message.error ? toast.error(message.error)
    : toast.success(message.success);
  
  return notify;

}