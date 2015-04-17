/// <reference path="../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../typings/knockout/knockout.d.ts" /><% if(props.useSocketIO){ %>
/// <reference path="../../../../typings/socketio-client/socket.io-client.d.ts" /><% } %>

class ViewModel {
  private static INSTANCE:ViewModel = new ViewModel();

  public static getInstance():ViewModel {
    return this.INSTANCE;
  }

  private name: KnockoutObservable<string> = ko.observable("");
  private input1: KnockoutObservable<string> = ko.observable("");

  private sendajax(): void {
    $.ajax({
      type: "POST",
      url: "/json",
      data: ko.toJSON(ViewModel.getInstance()),
      contentType: "application/json",
      dataType: "json",
    }).done(function(data){
        alert(data.foo);
    }).fail(function(data){
        alert('error');
    });
  }

  public static bind() {
    ko.applyBindings(this.INSTANCE);
  }
<% if(props.useSocketIO){ %>  private socket:SocketIOClient.Socket = null;
  private connectWithSocketio(): void {
    if (this.socket != null && this.socket.connected) {
      alert('already connected');
      return;
    }
    this.socket = io.connect('http://localhost:3000/', { 'force new connection' : true });
    this.socket.on('connect', function() {
      this.firstConnected = true;
      alert("conneted");
    });
    this.socket.on('disconnect', function(){
      alert('disconnected');
    });
    this.socket.on('message push', function (msg) {
      alert('get pushed message:' + msg.key);
    });
  }

  private sendMessage(): void {
    if (this.socket == null) {
      alert("not connected!");
      return;
    }
    var message = { key: 'messagedata' };
    alert("send message:" + message.key);
    this.socket.emit('message send', message);
  }

  private disconnect(): void {
    if (this.socket == null) {
      alert("not connected!");
      return;
    }
    var client = { id : (<any>this.socket).id };
    this.socket.emit('disconnect socket', client);
  }<% } %>
}

$(function(){
  ViewModel.bind();
})
