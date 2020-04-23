// 原型链继承
// 子构造函数的原型执行父构造函数的实例化对象
// 缺点： 子构造函数生成多个示例时候，对父类引用属性修改时，会影响别的实例
function SuperType() {
    this.property = true;
    this.arr = [1,2,3,4,5]
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
}

function SubType() {
    this.subproperty = false;
}

// 这里是关键，创建SuperType的实例，并将该实例赋值给SubType.prototype
SubType.prototype = new SuperType();

SubType.prototype.getSubValue = function() {
    return this.subproperty;
}

var instance = new SubType();
var instance2 = new SubType();
console.log(instance.getSuperValue()); // true
instance.arr.push(666)
console.log(instance2.arr)


// 构造函数继承
// SuperType.call(this) new 子实例的时候调用父类构造函数，相当于把父类构造函数执行一遍
// 缺点： 只能继承父类的实例属性和方法，不能继承原型的属性/方法
// 父类无法复用， 每个子类都有父类实现实例函数的副本，浪费性能
function SuperType() {
    this.list = [1,2,3,4,5]
}

SuperType.prototype.say = function() {
    console.log('hello')
}

function SubType() {
    SuperType.call(this)
}

var instance1 = new SubType();
instance1.list.push(666666);
console.log(instance1.list);
// instance1.say()  // error: instance1.say is not a function

var instance2 = new SubType();
console.log(instance2.list);


// 3: 组合继承 结合前面两种继承的实现
// 缺点： 两次调用SuperType
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
    console.log(this.name);
};

function SubType(name, age){
    // 继承属性
    // 第二次调用SuperType()
    SuperType.call(this, name);
    this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用SuperType()
SubType.prototype = new SuperType();
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function(){
    console.log(this.age);
};

var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
console.log(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27


// 4: 原型式继承
// 利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。

function object(obj){
    function F(){}
    F.prototype = obj;
    return new F();
}

var person = {
    name: "Nicholas",
    friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");
console.log(person.friends);   //"Shelby,Court,Van,Rob,Barbie"

