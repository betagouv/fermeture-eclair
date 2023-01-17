Hypothèse à valider : ça va être simple à gérer avec les tokens

-   action différente si incident_triggered ou incident_ignored / incident_resolved
-   parser le retour de GitGuardian
-   utiliser Joi
-   vérifier la signature de GitGuardian
-   gérer les différents repos enregistrés / différents tokens
-   si incident_ignored ou resolved, ne repasser en open que s'il était open avant
