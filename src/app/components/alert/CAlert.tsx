import './CAlert.css';

export default function Alert({ message }: { message: String}) {

  if (!message) return <></>;

  return (

    <div className="alert">
      <ul>
        <li>{ message }</li>
      </ul>
    </div>

  );

}