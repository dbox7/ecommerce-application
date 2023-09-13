import useToastify from './useToastify';

export const useShowMessage = () => {

  const notify = useToastify();

  return (msg: { body: string, error: boolean }) => {

    if (msg.body !== '') {
  
      msg.error ? 
        notify({ error: msg.body })
        :
        notify({ success: msg.body });
    
    }

  };  
  
};