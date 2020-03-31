<?php


/*
 * Author: Christoph Weiss
 */

class Database
{
    private static $db = null;

    private function __construct()
    {
    }

    public static function getDB()
    {

        if (self::$db == NULL) {
            try {
                $servername = "panel.weisschristoph.me";
                $db = "bestellsystem";

                self::$db = new PDO("mysql:host=$servername;dbname=$db", 'bestellsystem', '$&5s6ocCwkBN');
                self::$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                self::$db->exec("set names utf8");
            } catch (PDOException $e) {
                echo $e->getMessage();
            }
        }
        return self::$db;
    }
}
