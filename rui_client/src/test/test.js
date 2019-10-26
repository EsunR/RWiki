class Tester {
  // static arr = [0, 0, 0, 0];
  static  = 42;

  constructor() {
    this.name = "huahua"
  }
  action() {
    console.log("walking");
  }
  change() {
    Tester.arr = [1, 2, 3]
  }
}
Tester.myStaticProp = 

let tester = new Tester()
console.log(tester.change());
console.log(Tester.myStaticProp);