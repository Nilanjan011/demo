<?php

error_reporting(0);
$conn= mysqli_connect("localhost","root","","my_api");
if(mysqli_connect_error())
{
  print"Connection Error".mysqli_connect_error();
}
?>