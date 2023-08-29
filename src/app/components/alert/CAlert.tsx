import './CAlert.css';

const Alert = ({ message }: { message: String }) => {

  if (!message) return <></>;

  return (

    <div className="alert">
      <ul>
        <li>{ message }</li>
      </ul>
    </div>

  );

};

export default Alert;