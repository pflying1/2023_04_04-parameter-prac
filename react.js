// 나머지 매개변수라는 이름으로 부르는 ...arguments
// ...(점이 세개) 작성법은
// 객체 데이터를 배열로 간단하게 처리하는 상당히 편리한 작성법으로
// 이를 사용하면, 함수의 매개변수를 배열로 받을 수 있다. 

function restParameterExample(...properties) {
  // 임의의 객체 리터럴 tempObject 선언
  let tempObject = {
    id: "",
    name: "",
    password: "",
    email: "",
  };
  // 오직 배열만 사용할 수 있는 .shift() 매개변수를 사용 할 수 있다.
  // .shift()는 배열의 첫번째 요소를 제거하고, 제거된 요소를 반환한다.
  for(let key in tempObject) {
    tempObject[key] = properties.shift();
  }
  return tempObject;
}

console.log(restParameterExample("jeong", "정", "admin123", "jeong@gmail.com"));
