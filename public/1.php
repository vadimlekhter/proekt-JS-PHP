<?php
namespace app\servises;
use app\servises\Db;
use \PDO;


$pdo = new PDO('mysql:dbname=my_shop;host=localhost', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$pdo->exec('SET NAMES utf8');


$sql='SELECT * FROM `products`';

$pdoStatement = $pdo->prepare($sql);
//$pdoStatement = $pdo->query($sql);
$pdoStatement->execute();


$pdoStatement->setFetchMode(\PDO::FETCH_ASSOC);


$resultArr = $pdoStatement->fetchAll();

//$resultJson['contents'] = $resultArr;
//echo json_encode($resultJson, JSON_NUMERIC_CHECK);


echo json_encode($resultArr, JSON_NUMERIC_CHECK);