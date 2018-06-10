<?php

require __DIR__ . '/vendor/autoload.php';
require_once 'libraries/scriptator.php';

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

$app->get('/login', function() use($app, $db){
    try{
        $email = $app->request->get('email');
        $pass = $app->request->get('pass');
        $md5Pass = md5($pass);
        $query = "SELECT * FROM usuarios WHERE ".
                "email = '$email' AND ".
                "password = '$md5Pass'";
        $row = $db->query($query)->fetch_assoc();
    
        if($row){
            $encripted = Scriptator::createToken($row['id'], $row['name'], $row['email'], $row['role']);
            $user = array(
                'id' => $row['id'],
                'name' => $row['name'],
                'email' => $row['email'],
                'role' => $row['role'],
                'token' => $encripted,
            );
            $result = array(
                'status' => 'sucess',
                'code' => 201,
                'data' => $user
            );
        }else{
            $result = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'No existe el usuario'
            );
        } 
        echo json_encode($result);    
    }catch(Exception $excepcion){
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
        echo json_encode($result);    
    }    
});

$app->get('/login/check', function() use($app, $db){
    try{
        $user = $app->request->get('token');
        $result = array(
            'status' => 'error',
            'code' => 404,
            'message' => 'No hay usuarios logueados'
        );
        if(isset($user) ){
            $descriptedToken = Scriptator::decrypt($user);
            $newToken = Scriptator::checkedToken($descriptedToken);
            $user = array(
                'id' => $descriptedToken->id,
                'name' => $descriptedToken->name,
                'email' => $descriptedToken->email,
                'role' => $descriptedToken->role,
                'token' => $newToken
            );
            if($newToken){
                $result = array(
                    'status' => 'sucess',
                    'code' => 201,
                    'data' => $user
                );
            }
        }
    }catch(Exception $excepcion){
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
    }     
      
    echo json_encode($result);
});

$app->post('/registrarse', function() use($app, $db){

    $json = $app->request->post('json');
    $data = json_decode($json, true);

    if(!isset($data['name'])){
        $data['name']=null;
    }
    if(!isset($data['email'])){
        $data['email']=null;
    }
    if(!isset($data['sex'])){
        $data['sex']=null;
    }
    if(!isset($data['role'])){
        $data['role']=null;
    }
    if(!isset($data['pass'])){
        $data['pass']="123";
    }
    $md5Pass = md5($data['pass']);

    $sql  = "INSERT INTO usuarios VALUES(NULL,".
                "'{$data['name']}',".
                "'{$data['email']}',".
                "'{$data['sex']}',".
                "'{$data['role']}',".
                "'{$md5Pass}'".
                ");";
    $query = $db->query($sql );    

    $result = array(
        'status' => 'error',
        'code' => 404,
        'message' => 'Error al registrarse'
    );
    if($query){
        $id = $db->insert_id;
        $sql = "SELECT * FROM usuarios WHERE id=".$id.";";
        $querySelect = $db->query($sql);
        if($querySelect->num_rows == 1){
            $user = $querySelect->fetch_assoc();
            $encripted = Scriptator::createToken($user['id'], $user['name'], $user['email'], $user['role']);
            $result = array(
                'status' => 'success',
                'code' => 201,
                'message' => 'Se registro correctamente',
                'data' => $encripted
            );
        }else{
            $result = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'Se registro correctamente, pero ocurrió un error al loguearse'
            );
        }        
    }else{
        if($db->error){
            if (strpos($db->error, 'Duplicate entry') !== false) {
                $result = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'El email ya se encuentra registrado'                
                );
            }
        }
    }
    echo json_encode($result);

});




$app->run();







