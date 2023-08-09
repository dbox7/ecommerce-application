import { useState } from 'react';
import SensitiveMessages from '../../SensetiveMessages';
import { apiRoot } from '../../ctp';


export function SignUpPage() {

  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const errors = new SensitiveMessages(setErrorMsg, '<ul><li>', '</li><li>', '</li></ul>');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();    
    errors.clear();

    if (email === '') {

      errors.add('Please enter email address');
    
    }

    if (password.length < 6) {

      errors.add('Password should be longer than 6 characters');
    
    }

    if (firstName === '') {

      errors.add('Please enter first name');
    
    }

    if (lastName === '') {

      errors.add('Please enter last name');
    
    }

    if (dateOfBirth === '') {

      errors.add('Please enter birthday');
    
    }

    if (errors.length === 0) {

      const payload = {
        email, password, firstName, lastName, dateOfBirth
      };

      apiRoot.customers()
        .post({body: payload})
        .execute()
        .then((data) => {

          // Юзер зарегался успешно. Его данные (UserInfo) будет в объекте `data.body.customer`
          // Мы просто выведем это в консоль, но потом нужно будет запомнить текущего юзера и перейти на маршрут "/"
          console.log('SUCCESS');
          console.log(data);
        
        })
        .catch((err) => {

          // Эта функция вызовется, если API-запрос вернёт HTTP-ошибку.
          errors.add(err.message);
        
        });

    }
    
  };

  return (
    <div className="page-register">
      <h1>Sign-Up</h1>
      
      {errorMsg && <div dangerouslySetInnerHTML={{__html: errorMsg}} />}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        </div>
        
        <div>
          <label>Password:</label>
          <input type="password" onChange={(e) => setPassword(e.currentTarget.value)} />
        </div>

        <div>
          <label>First Name:</label>
          <input type="text" onChange={(e) => setFirstName(e.currentTarget.value)} />
        </div>
        
        <div>
          <label>Last Name:</label>
          <input type="text" onChange={(e) => setLastName(e.currentTarget.value)} />
        </div>
        
        <div>
          <label>Birthday:</label>
          <input type="date" onChange={(e) => setDateOfBirth(e.currentTarget.value)} />
        </div>

        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );

}
