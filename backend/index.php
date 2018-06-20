<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require __DIR__ . '/vendor/autoload.php';
require_once 'libraries/scriptator.php';
require_once 'clases/login.php';
require_once 'clases/MWparaCORS.php';
require_once 'clases/MWparaAutentificar.php';

date_default_timezone_set('America/Argentina/Buenos_Aires');

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

header('Access-Control-Allow-Origin: *'); //permite cros domain
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$app = new \Slim\App(["settings" => $config]);

$app->get('[/]', function (Request $request, Response $response) {
    $response->getBody()->write("Bienvenido!!!");
    return $response;
  })->add(\MWparaCORS::class . ':HabilitarCORSTodos');


$app->post('/pruebas[/]', \loginApi::class . ':pruebas')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->post('/login[/]', \loginApi::class . ':login')->add(\MWparaCORS::class . ':HabilitarCORSTodos');

$app->post('/login/check', \loginApi::class . ':checkLogin')
->add(\MWparaCORS::class . ':HabilitarCORSTodos');

//API EJEMPLO, PERMISO SOLO PARA ADMINS
$app->post('/conPermiso', \loginApi::class . ':pruebas')
->add(\MWparaCORS::class . ':HabilitarCORSTodos')->add(\MWparaAutentificar::class . ':VerificarAdmin');


$app->run();
