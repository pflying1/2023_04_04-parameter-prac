// 매개변수가 너무 많아지는 경우가 필연히 발생한다.
function tooManyParameters(a, b, c, d, e, f, g, h){
  let localArray = [a, b, c, d, e, f, g, h];
  //위 localArray와 같이 배열로 일단 넣을 수는 있겠지만,
  // 이렇게 하면, 매개변수가 늘어날 때마다, 배열도 늘려야 하는 큰 문제점이 발생한다.
  // 그래서 나온 것이 나머지 매개변수이다. 
  return localArray;
}

function shortParameters(...h){
  let localArray2 = [a, b, c, d, e, f, g, h]

  return localArray2;
  
}