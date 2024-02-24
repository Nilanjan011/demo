<?php
include("dbcon.php");

$id = ($_GET['id']);

$sql = "SELECT * FROM `api` WHERE `id` = $id";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
   $rows = array();
   while ($r = mysqli_fetch_assoc($result)) {
      $rows["result"][] = $r;
   }
   echo json_encode($rows);
} else {
   echo '{"result": "no data found"}';
}
