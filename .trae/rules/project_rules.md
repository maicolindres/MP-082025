
Contexto
El Ministerio Público es una institución clave en la justicia y la seguridad del país, con múltiples fiscalías distribuidas en todo el territorio nacional. Su misión es ofrecer una amplia gama de servicios a la ciudadanía, enfocados en la persecución del delito y la administración de justicia. Actualmente, el Ministerio Público enfrenta desafíos en la gestión de casos y en la optimización de sus procesos internos debido a la creciente demanda y la necesidad de un sistema más eficiente.

Para mejorar la eficacia y la transparencia de sus operaciones, se requiere el desarrollo de una aplicación de software que facilite la gestión de casos, la comunicación entre fiscalías y el seguimiento de procesos judiciales.


La aplicación debe cumplir con los siguientes requisitos:
1 Gestión de Casos
1.1 Registro y actualización de casos.
1.2 Asignación de casos a fiscales específicos.
1.3 Un caso solo puede ser reasignado si el estado es pendiente y si el nuevo fiscal pertenece a la misma fiscalía que el fiscal anterior. Si no, debe generar un log de intento fallido.
1.3 Seguimiento del estado y progreso de los casos.
2 Informes y Estadísticas
2.1 Generación de informes sobre el estado de los casos.
3 Interfaz de usuario
3.1 Interfaz intuitiva y fácil de usar para los fiscales.
3.2 Acceso seguro mediante autenticación y control de permisos.

Requisitos técnicos obligatorios
1 Diseño de Frontend con Reactjs.
2 Desarrollo de servicios RESTful para comunicación entre el Frontend y Backend. (NodeJS con express).
3 Elaboración de Procedimientos Almacenados en SQL Server para todas las operaciones en base de datos. (Inserción, Actualización, Consulta y Eliminación de las acciones).
4 La aplicación deberá desplegarse en un ambiente contenerizado Docker.
5 Pruebas unitarias mínimas del backend
6 Simulación de pruebas a los endpoints con Postman o Swagger documentado
