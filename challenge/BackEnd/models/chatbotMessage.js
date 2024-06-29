class Message {
    constructor(user, text, chatType) {
      this.user = user;
      this.text = text;
      this.chatType = chatType;
      this.timestamp = new Date();
    }
  }
  
module.exports = Message;