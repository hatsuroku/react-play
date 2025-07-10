class MyClass {
  constructor(readonly name) {
    this.sayHello(); // 调用成员函数
  }

  getSth() {
    return this.name + '!';
  }

  sayHello() {
    console.log(`Hello, ${this.getSth()}!`);
  }
}

const obj = new MyClass("Alice");
// 输出: Hello, Alice!
