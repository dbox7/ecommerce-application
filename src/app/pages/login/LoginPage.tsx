
import { CLoginForm } from '../../components/loginForm/CLoginForm';




export function LoginPage(): JSX.Element {

  const navigate = useNavigate();

  const { setUser } = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {

    if (window.localStorage !== undefined) {

      let userInfo = window.localStorage.getItem('user');

      if (userInfo) {

        setUser(JSON.parse(userInfo));
      
      }
      console.log(userInfo);

    }

  }, []);

  const handleInputChange = (field: string, value: string) => {

    switch (field) {

    case 'email':
      setEmail(value);
      break;
    case 'password':
      setPassword(value);
      break;

    }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

  

    const payload = {
      email, password
    };
    
    apiRoot.login()
      .post({body: payload})
      .execute()
      .then((data) => {

        console.log('SUCCESS');
        console.log(data);
        const user = JSON.stringify(data.body.customer);

        localStorage.setItem('user', user);
        navigate('/');
        setUser(true);

      })
      .catch((err) => {

        console.log(err.message);

      });

  };


  return (

    <CLoginForm />
  );

};

