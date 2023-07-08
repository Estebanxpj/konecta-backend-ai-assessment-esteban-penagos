(Konecta Prueba Tecnica)

############# Pasos para ejecutar el API  ##################

1. Tener Intalado Node mas reientes.

2. Abrir un Editor de codigo. Recomiendo Visual Code.

3. Cargar el proyecto llamado "task-manager-api".

6. Abrir una terminar de comandos.

7. Desde la terminal de comandos ir hasta el la ruta proyecto "task-manager-api".

8. Ejecutar el comando "npm install", este comando reinstalara los modulos y librerias que necesita la aplicacion.

9. Ejecutar el comando "npm run start".

10. Esperar a que cargue el servidor en el localhost y se conecte a la base de datos. 

11. Abrir postman

12. Consumir la ruta: localhost:6040/api/v1/authorize, este enpoint es un post que recibe un json
con los siguientes parametros: 
{
    "domain": "cualquier dominio",
    "apiKey": "U2FsdGVkX19fRCi9qkaIONK8XPxdaWF2RV3mvGYw0LI="
}

13. Con el token que les devuelve pueden consumir los enpoint de creacion de usuarios y login
    ("localhost:6040/api/v1/users/register", "localhost:6040/api/v1/login")

14. el enpoint de login recibe "localhost:6040/api/v1/login" el siguiente esquema:
{
    "data": "json cifrado de userName, password",
    "key":  "clave con que fue sifrado el json"
}
(El cifrado se realiza con la libreria "crypto-js" de javascript, con Encriptado AES)
Este enpoint de devuelve un token con el que puedes consumir las apis de el modulo Task

15.las apis del modulo task son: ((post-crear)localhost:6040/api/v1/tasks, (patch-actualizar)localhost:6040/api/v1/tasks/64a9c7016b1c8feb94aac132, 
(get-consultar )localhost:6040/api/v1/tasks/64a9c7016b1c8feb94aac132), (get-consultar )localhost:6040/api/v1/tasks, (delete-eliminar)localhost:6040/api/v1/tasks/64a9c7016b1c8feb94aac132)

Si requiere mas informacion comunicar se al Correo estebanxpj@gmail.com.

Creador: Esteban Penagos Salazar.

################################################################################