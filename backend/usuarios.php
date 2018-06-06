<?php

require __DIR__ . '/vendor/autoload.php';
//require_once "vendor/autoload.php";
//use \Slim\Slim();
use \Firebase\JWT\JWT;

$app = new \Slim\Slim();

$db = new mysqli('localhost', 'root', '', 'remiseria_humberto');

date_default_timezone_set('America/Argentina/Buenos_Aires');

header('Access-Control-Allow-Origin: *'); //permite cros domain
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

$app->get("/pruebas", function() use($app){
    echo "app pruebas";
});




$app->run();




