<?php

require_once 'AutentificadorJWT.php';
require_once 'clases/usuario.php';

class loginApi {

    public function pruebas($request, $response, $args){
        $lala = $request->getHeader('Authorization')[0];
        //$headers = $request->getHeaders();
        $result = array(
            'status' => 'success',
            'code' => 200,
            'message' => "Token valido ",
            'data' => $lala
        );
        return $response->withJson($result);        
       
        /* var_dump($request);
        echo "<br>";
        echo "RESPONSEEEEEEEEEEEEEEEEEEEEEE";
        var_dump($response);
        echo "<br>";
        var_dump($args);*/

    }

    public function login($request, $response, $args) {
        $result = array(
            'status' => 'error',
            'code' => 500,
            'message' => "Error 500 de servidor"
        );
        try{
            $ArrayDeParametros = $request->getParsedBody();
            $token="";
            if(isset( $ArrayDeParametros['email'])&& isset( $ArrayDeParametros['pass'])) {   
                $email = $ArrayDeParametros['email'];
                $pass =  $ArrayDeParametros['pass'];
                $md5Pass = md5($pass);
                $user = usuario::TraerEmpleadoEmailClave($email, $md5Pass);
                if($user){
                    $token = AutentificadorJWT::createToken($user->id, $user->name, $user->email, $user->role);
                    $result = array(
                        'status' => 'success',
                        'code' => 201,
                        'message' => 'Se registro correctamente',
                        'data' => $token
                    );
                }else{
                    $result['message'] = "No existe el usuario o contraseña inválida";
                }
            }else{
                $result['message'] = "Usuario e Email requerido";
            }
        }           
        catch(Exception $excepcion){
            $result['message'] = "Error 500 de servidor ".$excepcion->getMessage();
        }
        return $response->withJson($result);     
    }
    

    public function checkLogin($request, $response, $args){
        $result = array(
            'status' => 'error',
            'code' => 404,
            'message' => "No hay usuarios logueados"
        );
        try{
            $token = $request->getHeader('Authorization')[0];
            if(isset($token)){
                $descriptedToken = AutentificadorJWT::checkedToken($token);
                if(isset($descriptedToken)){
                    $newToken = AutentificadorJWT::createToken($descriptedToken->id, $descriptedToken->name, $descriptedToken->email, $descriptedToken->role);
                    $result = array(
                        'status' => 'success',
                        'code' => 201,
                        'message' => 'Se registro correctamente',
                        'data' => $newToken
                    );
                }else{
                    $result['message'] = "Token no válidos";
                }
            }else{
                $result['message'] = "Token vacío";
            }        
        } catch(Exception $excepcion){
            $result['message'] = $excepcion->getMessage();
        }
        return $response->withJson($result);   
    }


}