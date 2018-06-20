<?php
include_once "AccesoDatos.php";

class usuario{

    public $id;
    public $name;
    public $sex;
    public $email;
    public $password;
    public $role;

    public static function TraerUsuarioEmail($email) 
	{
			$objetoAccesoDato = AccesoDatos::dameUnObjetoAcceso(); 
			$consulta =$objetoAccesoDato->RetornarConsulta("select id,name,email,sex,role,password from usuarios where email = '$email'");
			$consulta->execute();
            $user= $consulta->fetchObject('Usuario');
            if($consulta->rowCount() == 0){
                return false;   
            }
			return $user;		
    }

    public static function TraerEmpleadoEmailClave($email,$pass){
		$objetoAccesoDatos = AccesoDatos::dameUnObjetoAcceso(); 
        $consulta = $objetoAccesoDatos->RetornarConsulta("select id,name,email,sex,role,password from usuarios WHERE email=:email AND password=:pass");
        $consulta->bindValue(':email', $email, PDO::PARAM_STR);
        $consulta->bindValue(':pass', $pass, PDO::PARAM_STR);
		$consulta->setFetchMode(PDO::FETCH_CLASS, "usuario");
		$consulta->execute();
        return $consulta->fetchObject('usuario');
    }
}