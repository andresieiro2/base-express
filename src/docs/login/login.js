/**
 @module Login
*/

/**
   * -----------
   * @name Login on TSV
   * @authentication This route dont require Authentication
   * 
   * @route {POST} login
  
   *
   * @bodyparam {String} cpf CPF Number 
   * @bodyparam {String} senha User password
   * 
   * 
   * @function
   * @example 
        
Return Sample
    "code": 200
    {
        "token": "eyQ1LDE.Wjs_63TQLnM8RTsSucTX2GK5bwkADXdETVnZcpTBWC0",
        "celular_verificado": true,
        "termos_aceite": true
    }

Error Sample 
    code: 406
    {
        "message:"Usuário nao encontrado"
    }
       
   */

/**
   * -----------
   * @name Check user is on TSV
   * @authentication This route dont require Authentication
   * 
   * @route {GET} login/check-user
  
   *
   * @queryparam {String} cpf CPF Number 
   * 
   * 
   * @function
   * @example 
        
Return Sample
    "code": 200
    {
   
        "token": "f9bf78b9a18ce6d46a0cd2b0b86df9daf9bf78b9a18ce6d46a0cd2b0b86df9daf9bf78b9a18ce6d46a0cd2b0b86df9daf9bf78b9a18ce6d46a0cd2b0b86df9da",
        "user": {
            "nome":"Teste Nome",
            "email":"aa@teste.com"
        }
    }

Error Sample 
    code: 409
    {

   
        message: 'Usuário já realizou o primeiro acesso.',
    }
       
   */
