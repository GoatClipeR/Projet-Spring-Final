# E‑Banking (Angular + Spring Boot)

Ce workspace contient :
- **Frontend** Angular (UI reconstruite) : `digital-banking-front-main/digital-banking-front-main`
- **Backend** Spring Boot (API + JWT + H2 en dev) : `ebanking-backend-main/ebanking-backend-main`

## Prérequis

### Backend
- **JDK 17** (aligné avec `pom.xml`)
- (Optionnel) **Maven** : le projet fournit `mvnw.cmd` (recommandé)

### Frontend
- **Node.js** : recommandé **Node 20 LTS** (Angular 17 peut afficher un warning avec Node 22)
- **npm** (fourni avec Node)

## Exécuter le projet (mode dev)

### 1) Lancer le backend (API)

Depuis la racine du workspace :

```powershell
cd "ebanking-backend-main\ebanking-backend-main"
.\mvnw.cmd spring-boot:run
```

Backend disponible sur :
- API : `http://localhost:8085/`
- OpenAPI : `http://localhost:8085/v3/api-docs`
- Swagger UI (si activé par springdoc) : `http://localhost:8085/swagger-ui/index.html`
- H2 Console : `http://localhost:8085/h2-console`

**Base de données (dev)** : H2 in‑memory (config dans `src/main/resources/application.properties`).

### 2) Lancer le frontend (Angular)

Dans un **autre terminal** :

```powershell
cd "digital-banking-front-main\digital-banking-front-main"
npm install
npm start
```

Frontend disponible sur :
- `http://localhost:4200/`

## Comptes de test

- **admin / 12345** (rôle ADMIN)
- **user1 / 12345** (rôle USER)

## Commandes utiles

### Frontend

```powershell
cd "digital-banking-front-main\digital-banking-front-main"

# Démarrage dev
npm start

# Build production (sortie dans dist/)
npm run build
```

### Backend

```powershell
cd "ebanking-backend-main\ebanking-backend-main"

# Lancer
.\mvnw.cmd spring-boot:run

# Build (jar)
.\mvnw.cmd -DskipTests package
```

## Dépannage rapide

- Si l’UI affiche des erreurs API : vérifier que le backend écoute sur `http://localhost:8085`.
- Si Node affiche « unsupported » : installer Node 20 LTS et relancer `npm install`.
