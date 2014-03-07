(function () {
  var form = $("#submitMatchForm")
    , casterList = form.find("#casterNames")
    , casterInput = form.find("#newCasterInput")

  var makeCasterTemplate = function (name) {
    var li = $("<li></li>")
      , button = $('<button class="btn btn-sm btn-danger">remove</button>')

    button.click(deleteCaster);
    li.data("name", name);
    li.append(name);
    li.append(button);
    return li;
  };

  var makeFighterTemplate = function (name) {
    var li = $("<li></li>");      
  };

  var addCaster = function (e) {
    var casterName = e.target.value;

    if (e.keyCode !== 13) return true;
    e.preventDefault();
    e.stopPropagation();
    casterList.append(makeCasterTemplate(casterName));
  };

  deleteCaster = function (e) {
    $(e.target).parent().remove();
  };

  var getValues = function (formEl) {
    var casterNames = casterList.children().makeArray().map(function (i, each) {
      return $(each).data("name"); 
    });
    return {
      title: formEl.find("#title").val(),
      game: formEl.find("#game").val(),
      event: formEl.find("#event").val(),
      casterNames: casterNames
    }; 
  };

  var handleSubmission = function (e) {
    e.preventDefault();
    console.log(getValues(form));
  };

  casterInput.keydown(addCaster);
  form.submit(handleSubmission);
})();
