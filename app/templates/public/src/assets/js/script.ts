/// <reference path="../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../typings/knockout/knockout.d.ts" />

class ViewModel {
  private static INSTANCE:ViewModel = new ViewModel();

  public static getInstance():ViewModel {
    return this.INSTANCE;
  }

  private name: KnockoutObservable<string> = ko.observable("");
  private input1: KnockoutObservable<string> = ko.observable("");

  private btnClick(): void {
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
}

$(function(){
  ViewModel.bind();
})
