export default class SensitiveMessages {

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
