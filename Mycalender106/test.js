function sayHello(name) {
    if (!name) return "error";
    console.log("Hi there!" + name);
    return "Hi there:" + name;
}




function testFns() {

    let x= "Justine";
    let res = sayHello(x);
    console.log(res);
}

function Dog(name, age) {
this.name = name;
this.age = age;
}
class Cat {
constructor(name, age, color){
this.name = name;
this.age = age;
this.color = color;
    }
}

function testObj() {
//object literal
    let lola = { 
    name:"lola",
    age: "3",
    };
    console.log(lola);

//object constructor
let fido = new Dog("fido", 4);
let mouse = new Dog("Mouse", 5);
console.log(fido);
console.log(mouse);
    
//class
let a= "king";
let king = new Cat(a, 3, "Black");
console.log(king);

//use objects
console.log(lola.name);
console.log(fido.age);
king.color = "blue";

}
function testReq() {
    $.ajax({
        type: "GET",
        url: "http://restclass.azurewebsites.net/api/test",
        success: function(res) {console.log("Request OK", res)},
        error: function(error) {console.error("request failed :(", error);},
    });
}

