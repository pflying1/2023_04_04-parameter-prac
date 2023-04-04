const exampleObject = {
  name : {
    korean : "정",
    english : "jeong"
  },
  age : 20,
  email : "jeong@gmail.com"
}
// 배열 메서드 처럼 객체에도 .hasOwnProperty() 메서드가 있다.
// .hasOwnProperty() 메서드는 객체가 특정 속성을 가지고 있는지 확인할 수 있다. 
// return 타입은 아래에서 확인 할 수 있듯 boolean 타입으로 간단하게 확인 할 수 있다.
console.log(exampleObject.hasOwnProperty('name'));
console.log(exampleObject.hasOwnProperty('age'));
console.log(exampleObject.hasOwnProperty('address'));
console.log(exampleObject.name.hasOwnProperty('korean'));
