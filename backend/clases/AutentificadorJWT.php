<?php
use \Firebase\JWT\JWT;
require_once 'vendor/autoload.php';
require_once 'usuario.php';

class AutentificadorJWT{


    static public function createToken($id, $userName, $userEmail, $userRole){
        $key = "example_key";
        $tokenToEncrypt = [
                       "id"=>$id,
                       "name"=>$userName,
                       "email"=>$userEmail,
                       "role"=>$userRole,
                       "create_date"=>date('d/m/Y H:i:s')
        ];
        $encripted = JWT::encode($tokenToEncrypt, $key);
        
        return $encripted;
    }

    static public function checkedToken($token){
        $key = "example_key";
        if(empty($token)|| $token=="")
        {
            throw new Exception("El token esta vacio.");
        } 
        // las siguientes lineas lanzan una excepcion, de no ser correcto o de haberse terminado el tiempo       
        try {
            $decodificado = JWT::decode($token, $key, array('HS256'));
        } catch (Exception $e) {           
           throw new Exception("Token no valido - ".$e->getMessage());
        }
        return $decodificado;
        // si no da error,  verifico los datos de AUD que uso para saber de que lugar viene  
      /*  if($decodificado->aud !== self::Aud())
        {
            throw new Exception("No es el usuario valido");
        }
        return $decodificado;*/

    }

    //no se bien que hace este metodo, lo comente en la llamada de checkedtoken
    private static function Aud()
    {
        $aud = '';
        if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
            $aud = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $aud = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } else {
            $aud = $_SERVER['REMOTE_ADDR'];
        } 
        $aud .= @$_SERVER['HTTP_USER_AGENT'];
        $aud .= gethostname();
        
        return sha1($aud);
    }
    
}
