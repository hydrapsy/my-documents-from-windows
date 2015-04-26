
<script type="text/javascript">
function reverse_string(str){var
stri = "";var
alen = str.length;for (var i = alen ; i > 0 ; i--){stri += str.charAt(i-1)}return stri;
}
function palindrome(str){return (str == reverse_string(str));
}
function palindrome_check(){var str = document.getElementById('inputstr').value;
if(str!=""){document.getElementById('reversestr').value=reverse_string(str);document.getElementById('ispalin').value=palindrome(str);return true;}else alert ('Enter String');
}
</scripts>



<html>
<head>

    <script>
function findVowels() {

var str=document.getElementById('name').value;  

   var vowelC = 0;
var total_findVowels="";
     for (var i = 0; i < str.length; i++) {

     if (str.charAt(i).match(/[a-zA-Z]/) != null) {

        // findVowels

        if (str.charAt(i).match(/[aeiouAEIOU]/))
  {

 total_findVowels=total_findVowels+str.charAt(i);            
 vowelC++;

        }

     }
   }
    document.getElementById('findVowels').value=total_findVowels;
 document.getElementById('findVowels_count').value=vowelC;
   alert("Total Number of findVowels: " + vowelC);
 

}
    </script>

