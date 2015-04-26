//binding actions to submit event.
$("form").submit(function){
	if ($"#pasword").val()==){
  alert('passwoord cannot be blank');
  return false;
}else if ($(#"username").val()==""){
	alert('username cannot be blank');
	return false;
 } else {
 	alert('all clear');
 }
});


//binding actions to change event.
$("#password").change(function(){
	if($("password").val(==""){
		alert('password cannot be blank');
	}
 });


 function validateForm() {
    var x = document.forms["myForm"]["fname"].value;
    if (x == null || x == "") {
        alert("Name must be filled out");
        return false;
    }
}



$(function() {
2
    $('#btnSubmit').bind('click', function(){
3
        var txtVal =  $('#txtDate').val();
4
        if(isDate(txtVal))
5
            alert('Valid Date');
6
        else
7
            alert('Invalid Date');
8
    });
9
});




function isDate(txtDate)
02
{
03
  var currVal = txtDate;
04
  if(currVal == '')
05
    return false;
06
   
07
  //Declare Regex 
08
  var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/;
09
  var dtArray = currVal.match(rxDatePattern); // is format OK?
10
 
11
  if (dtArray == null)
12
     return false;
13
  
14
  //Checks for mm/dd/yyyy format.
15
  dtMonth = dtArray[1];
16
  dtDay= dtArray[3];
17
  dtYear = dtArray[5];
18
 
19
  if (dtMonth < 1 || dtMonth > 12)
20
      return false;
21
  else if (dtDay < 1 || dtDay> 31)
22
      return false;
23
  else if ((dtMonth==4 || dtMonth==6 || dtMonth==9 || dtMonth==11) && dtDay ==31)
24
      return false;
25
  else if (dtMonth == 2)
26
  {
27
     var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
28
     if (dtDay> 29 || (dtDay ==29 && !isleap))
29
          return false;
30
  }
31
  return true;
32
}
Note: The above method checks for mm/dd/yyyy format. If you want to validate against the dd/mm/yyyy format then you make the slight change in this function. Change below code in function to,
1
//Checks for mm/dd/yyyy format.
2
    dtMonth = dtArray[1];
3
    dtDay= dtArray[3];
4
    dtYear = dtArray[5];       
this code.
1
//Checks for dd/mm/yyyy format.
2
    dtDay = dtArray[1];
3
    dtMonth= dtArray[3];
4
    dtYear = dtArray[5];  
Now, all you need to do is to call this function on button click to validate the date. Below jQuery code shows exactly the same thing.