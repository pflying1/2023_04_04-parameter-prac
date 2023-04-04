function basicReturnObject (parameterString, parameterNumber, parameterObject) {
  //data type check
  if(typeof(parameterString) !== 'string' && typeof(parameterNumber) !=='number' && typeof(parameterObject) !== 'object') {
    throw new Error('파라미터 타입이 잘못 입력');
  }
  //로컬변수 객체 초기화
  let tempObject = {
    a : parameterString,
    b : parameterNumber,
    c : parameterObject
  };
  return tempObject;
}

console.log(basicReturnObject('정', '정tjd', {id: 1, name: "정성철", email:"jeong@gmail.com"}));
  //결과물
/*   
  {
    a:'정',
    b:123,
    c:{id: 1, name: '정성철', email: 'jeong@gmail.com'}
  } 
*/