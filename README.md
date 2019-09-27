# Installation

### > Git clone
### > Vérifier que Node est installé (v.10 +)
### > npm install pour télécharger les dépendances
### > Ajuster les informations dans database.js (logins)
### > Lancer le serveur via 
```
$ npm start
```
### > Ouvrir une page localhost:3000
# Pages (GET)

### Home "/"

La page d'accueil comporte un formulaire front pour l'ajout d'un film à la liste.

### Liste "/list"

Un tableau d'objets correspondant à la liste de tous les films est affiché à cette adresse.

### Editer "edit/:id"

Cette adresse propose immédiatement un formulaire pré-rempli pour modifier un film de la liste.

# API (POST)

### Générer la liste des films "/download-list"
 
Une requête en POST à cette adresse créera un fichier texte contenant la liste de tous les films, dans le dossier "movies" du serveur.

### Ajouter un film "/new-movie"

Une requête en POST à cette adresse ajoutera un film à la base de données. 
nécessite dans le body un JSON à deux entrées, comme :
```
{
  "title": "mon titre",
  "creation_date": "yyyy-mm-dd"
}
```
L'ID s'incrémentera automatiquement.

### Modifier un film "/edit-movie/:id"

Une requête en POST à cette adresse ajoutera un film à la base de données. 
nécessite dans le body un JSON à deux entrées, comme ci-dessus.

### Supprimer un film "/delete/:id"

Une requête en POST à cette adresse supprimera le film correspondant à l'ID de la base de donnée.
