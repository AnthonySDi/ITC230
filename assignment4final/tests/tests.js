var expect = require("chai").expect;
var books = require("../lib/books");


// Find the book yay or nay
describe("books module", () => {
 it("returns requested title", function() {
    var result = books.get("neuromancer");
    expect(result).to.deep.equal({ title: "neuromancer", author: "william gibson", price: 7.99});
 });
 
 it("fails w/ invalid title", () => {
    var result = books.get("fake");
    expect(result).to.be.undefined;
 });
// Add the book yay or nay
it("adds the requested title", function() {
    var result = books.add({ title: "Neuromancer", author: "william gibson", code: 7.99});
    expect(result.added).to.be.true;
 });
 
 it("add failed with invalid title", () => {
     var result = books.add({ title: "falling free", author: "lois mcmaster bujold", price: .49 });
    expect(result.added).to.be.true;
 });
// delete the book yay or nay
 it("deletes the title", function() {
    var result = books.delete("solaris");
    expect(result.deleted).to.be.true;
 });
 
 it("delete failed with title", () => {
   var result = books.delete("nobook");
   expect(result.deleted).to.be.false;
 });
});