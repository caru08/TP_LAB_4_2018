<?php
    
class MWparaCORS {

    public function HabilitarCORSTodos($request, $response, $next) {
		/*
		al ingresar no hago nada
		*/
		 $response = $next($request, $response);
		 return $response
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
			->withHeader('Access-Control-Allow-Methods', 'GET, POST')
			->withHeader('Content-Type', 'application/json');
           /* ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-API-KEY, X-Requested-With, Content-Type, Access-Control-Request-Method, Accept, Origin, Authorization')
			->withHeader('Access-Control-Allow-Methods', 'GET, POST')
			->withHeader('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
			->withHeader('Content-Type', 'application/json');
			*/
			//header("Access-Control-Allow-Headers: X-API-KEY, Access-Control-Request-Method");

            
	}
    
}