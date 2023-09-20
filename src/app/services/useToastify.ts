import { toast } from 'react-toastify';

interface IToastify {
  error?: string;
  success?: string;
}

export default function useToastify() {

  const notify =  (message: IToastify) => message.error ? toast.error(message.error)
    : toast.success(message.success);
  
  return notify;

}