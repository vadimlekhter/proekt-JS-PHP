<?php

namespace app\servises;

use app\traits\TSingltone;
use \PDO;

//$config = include '../config/config.php';

class Db
{

    use TSingltone;

    public $pdo;

    public function __construct()
    {
        $this->pdo = new PDO('mysql:dbname=my_shop;host=localhost', 'root', '');
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->exec('SET NAMES utf8');
    }

    public function fetchAll ($sql) {
//        $sth = $this->pdo->prepare($sql);
//        var_dump($sth);
//        $sth->execute();
//        return $sth->fetchAll(PDO::FETCH_OBJ);
//        //return $sth;
        $result = $this->pdo->query($sql);
        var_dump($result);
    }

}