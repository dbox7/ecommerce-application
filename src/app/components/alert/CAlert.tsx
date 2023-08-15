import './CAlert.css';

export default function Alert({ messages}: { messages: String[]}) {

  if (messages.length === 0) return <></>;

  return (

    <div className={ 'alert' }>
      <ul>
        <li>{ messages.join('</li><li>') }</li>
      </ul>
    </div>

  );

}