<?php
require_once "AutentificadorJWT.php";
class MWparaAutentificar{

    public function VerificarAdmin($request, $response, $next) {
		$result = array(
            'status' => 'error',
            'code' => 403,
            'message' => 'No hay usuarios logueados'
		);
		$errorMessage = "";
        $objDelaRespuesta= new stdclass();
		if(isset($request->getHeader('Authorization')[0]))
    	{
            $arrayConToken = $request->getHeader('Authorization');
    		$token=$arrayConToken[0];
    	}else{
			$result->message = 'Acceso denegado a este sitio falta token';
            return $response->withJson($result, 403);
    	}
		try {
    		$dataToken = AutentificadorJWT::checkedToken($token);
    		$objDelaRespuesta->esValido=true;
    	} 
        catch (Exception $e) {
			$result['message'] = $e->getMessage();	
            return $response->withJson($result, 403);
		}
				
		if ($objDelaRespuesta->esValido) {
			$payload= $dataToken;
			$response = $next($request, $response);
			if (strtolower($payload->role)=="client") 
			{
   				$response = $next($request, $response);
    		}else{
				$result['message'] = "Acceso permitido solo a administradores";
    			return $response->withJson($result, 403);
            }
        }
		return $response;   
    }


}