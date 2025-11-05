# 4gl README
4GL Syntax and Snippets for VSCode
Esta es la extensión definitiva para trabajar con 4gl en VSCODE.

## Caracteristicas
Esta extensión permite usar 4GL en VSCode, asi tambien se incluyeron varios snippets que servirán para un desarrollo mas ágil.
- Snippets (Para acelerar el desarrollo)
- Syntax highlighting (Mejorado)

## Requirimientos
- Visual Studio Code 1.60 o Superior

## Versiones
Por favor ver: https://github.com/garysan/4gl/blob/master/CHANGELOG.md

## Instalación
1. Instalar Visual Studio Code 1.20 o superior
2. Iniciar Code
3. Inice la sección de commandos `Ctrl-Shift-P` (Windows, Linux) or `Cmd-Shift-P` (OSX)
4. Seleccione instalar extensiones
5. Escriba `4gl`
6. Eliga ja extensión con el icono 4gl
7. Recargue Visual Studio Code

## Informix 4GL Snippets

| Snippet                      | Proposito                  |
|------------------------------|----------------------------|
| `encabezado`                 |Inserta un encabezado con los datos generales del programa |
| `seccion`                 |Inserta un bloque a manera de comentario |
| `select`                 |Escribe un SELECT con la estructura clasica con un ORDER BY columna o columnas identifacadas por el nro de columna, Forma de uso: campos,tablas y condiciones |
| `select into`                 |Retorna los valores de un SELECT a un contenedor definido (generalmente un RECORD) o variables indicadas.|
| `insert`                 |Declara un insert  con el control del STATUS |
| `update`                 |Declara un update  con el control del STATUS |
| `delete`                 |Declara un delete  con el control del STATUS |
| `if`                 |Declara un IF|
| `foreach`                 |Declara un Foreach |
| `case`                 |Declara la estructura basica de un CASE |
| `cursor`                 |Declaración de cursor simple compuesto por un SELECT|
| `cursorForeach`                 |Cursor que incluye un SELECT y un FOREACH |
| `funcion`                 |Declara funcion con las definiciones basicas.|
| `record`                 |Declara un record basado en una tabla completa|
| `recordvar`                 |Declarar record con estructura propia, ya sea definición manual o similar al campo de una tabla |
| `error`                 |Muestra un mesaje error con sleep |
| `display`                 |Display con sleep |
| `displaybyname`                 |Display por un item del FORM |
| `message`                 |Mostrar un mensaje|
| `prepared`                 |Define un prepared statment y lo descarga al record elegido, previamente debe tener definida una variable para soportar el SQL |
| `preparedForeach`                 | Define un prepared statment y lo usa directamente en un foreach, previamente debe tener definida una variable para soportar el SQL |

## Forma de uso
Puede presionar `Ctrl` +` Space` (Windows, Linux) o `Cmd` +` Space` (MAC) para desplegar los snippets disponibles.

## Demo (encabezado/seccion)
![Demo](https://i.imgur.com/ykwU84y.gif?raw=true)

## Demo (SQL/cursor/prepared)
![Demo](https://i.imgur.com/2boaoxX.gif?raw=true)


## Reportar errores
Por favor si tienes algun error reportalo a: https://github.com/garysan/4gl/issues (https://github.com/garysan/4gl/issues)

## Contacto
Por favor enviame un correo a gary.gsv@gmail.com

#Licencia
MIT License, por favor leer el archivo LICENSE

# Source
[Github](https://github.com/garysan/4gl)

**Enjoy!**

