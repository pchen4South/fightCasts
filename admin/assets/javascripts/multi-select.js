require("lodash.js");
var cloneDeep = _.cloneDeep;
var extend = _.extend;
var reject = _.reject;
var initial = _.initial;
var reduce = _.reduce;



//internal function used to correctly copy the Widget with new params
//Widget, Object -> Widget
var set = function (widget, updates) {
  var propertyBlend = extend(cloneDeep(widget), cloneDeep(updates));

  return Widget(propertyBlend);
};

//helper used to calculate which candidates are matches based on string
window.calculateMatches = function (string, candidates) {
  console.log("candi", candidates);

  return reduce(candidates, function (matches, candidate) {
    return candidate.value.indexOf(string) > -1 
      ? matches.concat(cloneDeep(candidate))
      : matches;
  }, []);
};

//bounds selectionIndex by 0 and the size of the candidates
//Int, Int -> Int
window.calculateSelectionIndex = function (length, selectionIndex) {
  if (!selectionIndex) return 0;
  else if (selectionIndex <= 0) return 0;
  else if (selectionIndex >= length) return length - 1;
  else return selectionIndex;
};

//Struct definition.  No member functions/methods
//Object -> Object
window.Candidate = function Candidate (props) {
  if (!(this instanceof Candidate)) return new Candidate(props);
  if (!props.id) throw new Error("Must provide id");  

  this.id = props.id;
  this.value = props.value || this.id;
  return this;
};

//Struct definition.  No member functions/methods
//Object -> Object
window.Widget = function Widget (props) {
  if (!(this instanceof Widget)) return new Widget(props);

  this.name = props.name;
  this.focused = props.focused || false;
  this.search = props.search || "";
  this.candidates = props.candidates || [];
  this.matches = calculateMatches(this.search, this.candidates);
  this.selections = props.selections || [];
  this.selectionIndex = calculateSelectionIndex(
    this.matches.length, 
    props.selectionIndex || 0
  );
  return this;
};

//Widget, id -> Widget
window.addSelection = function (widget, candidate) {
  var selections = candidate
    ? widget.selections.concat(cloneDeep(candidate))
    : widget.selections;

  return set(widget, {
    selections: selections
  });
};

//Widget -> Widget
window.addActiveSelection = function (widget) {
  var candidate = widget.matches[widget.selectionIndex];
  var selections = candidate
    ? widget.selections.concat(cloneDeep(candidate))
    : widget.selections;

  return set(widget, {
    selections: selections,
    search: ""
  });
};

//Widget, index -> Widget
window.removeSelection = function (widget, index) {
  var selections = reject(widget.selections, function (selection, i) {
    return index === i; 
  });;

  return set(widget, {selections: selections});
};

//Widget -> Widget
window.removeLastSelection = function (widget) {
  var selections = _.initial(widget.selections);  

  return set(widget, {selections: selections});
};

//Widget -> Widget
window.incrementSelectionIndex = function (widget) {
  return set(widget, {selectionIndex: widget.selectionIndex + 1});
};

//Widget -> Widget
window.decrementSelectionIndex = function (widget) {
  return set(widget, {selectionIndex: widget.selectionIndex - 1});
};

//Widget, String -> Widget
window.updateSearch = function (widget, search) {
  return set(widget, {search: search});
};

//Widget, Boolean -> Widget
window.focus = function (widget, focused) {
  return set(widget, {focused: focused});
};

//Widget -> Widget
window.clearSearch = function (widget) {
  return set(widget, {search: ""});
};

//Widget -> Widget
window.clearSelections = function (widget) {
  return set(widget, {selections: []});
};