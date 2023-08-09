export default class SensitiveMessages {

  /**
   * Коллекция сообщений.
   * При изменении состояния, всегда вызывается коллбэк `textSetter(msg: String)`, которому передаётся
   * строка со склеенными всеми сообщениями.
   *
   * errors = new SensitiveMessages(setErrorMsg, '<ul><li>', '</li><li>', '</li></ul>');
   * errors.add("ашипка");  // Тут вызовется setError("<ul><li>ашипка</li></ul>");
   * errors.clear(); // Теперь вызовется setError('');
   */
  private messages: Array<String>;
  private textSetter: Function;
  private prefix: string;
  private glue: string;
  private suffix: string;

  constructor(textSetter: Function, prefix='', glue='<br>', suffix='') {

    this.messages = [];
    this.textSetter = textSetter;
    this.prefix = prefix;
    this.glue = glue;
    this.suffix = suffix;
  
  }

  add(msg: String) {

    this.messages.push(msg);
    this.setText();
  
  }

  clear() {

    this.messages = [];
    this.setText();
  
  }

  private setText() {

    if (this.messages.length) {

      this.textSetter(this.prefix + this.messages.join(this.glue) + this.suffix);
    
    } else {

      this.textSetter('');
    
    }
  
  }

  get length() {

    return this.messages.length;
  
  }

}
