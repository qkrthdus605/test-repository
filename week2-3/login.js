function compareValue() {
  let num1 = 10;
  // const num2 = 30;

  num1 = 20;
  alert("num1: " + num1);
}
function popId() {
  let userId = document.getElementById("txt_id").value;
  if (!userId) {
    alert("아이디를 입력해주세요");
  } else {
    alert(userId);
  }
}
function myFunction() {
  alert("1");
  alert("2");
  alert("3");
}
