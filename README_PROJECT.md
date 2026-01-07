# MAGMA Bank — Projet (Backend + Frontend)

Date générée : 2026-01-07

Ce README décrit l'architecture, le fonctionnement, l'installation et la procédure de test du projet **MAGMA Bank** (backend Spring Boot + frontend Angular), ainsi que la fonctionnalité Chatbot (OpenAI) que nous avons intégré.

---

## 🧭 Vue d'ensemble
- **Backend** : Spring Boot (Java 17), REST API, sécurité JWT, H2 en dev.
- **Frontend** : Angular (CLI), pages d'administration (Clients, Comptes, etc.), composant Chatbot (UI) accessible sous `/admin/chatbot` (protégé par guards).
- **Chatbot** : un endpoint `POST /ai/chat` dans le backend relaie le message vers l'API OpenAI (ou vers un fallback local en dev). Le backend ajoute un *system prompt* pour adapter les réponses au contexte de l'application bancaire.

---

## 📂 Structure principale (extrait)
- `digital-banking-front-main/digital-banking-front-main/` — frontend Angular (src/app/...)
- `ebanking-backend-main/ebanking-backend-main/` — backend Spring Boot (src/main/java/...)
- `FILES_TREE.md` — arbre des fichiers généré
- `README_PROJECT.md` — **(ce fichier)**

---

## ⚙️ Fonctionnement détaillé
### Backend
- `web/` : contrôleurs REST (Clients, Comptes, OpenAiController)
- `services/` : logique métier (BankAccountService, OpenAiService)
- `security/` : configuration JWT et endpoints d'auth ( `/auth/login` )
- `application.properties` : configuration (port, DB, placeholders OpenAI)

### Frontend
- `chatbot/` : composant UI pour converser (messages, envoi via `ChatService`)
- `services/chat.service.ts` : envoie POST vers `/ai/chat`, stocke l'historique localement
- Guards + Interceptor : gèrent l'authentification et injectent le token JWT

### Chatbot (comportement actuel)
- Le backend envoie un **system prompt** qui demande au modèle d'être **spécialisé pour l'application Ebanking** (instructions pas à pas pour l'UI).
- Le modèle utilisé est configurable via `openai.model` et la **température** peut être fixée (ex: `0.0` pour réponses déterministes).
- Sans pipeline RAG, les réponses s'appuient sur le modèle + prompts (prone to generalization/hallucination). Nous avons prévu un plan RAG (embeddings + vector store + ingestion) pour réponses ancrées.

---

## 🧪 Exécution locale (dev)
1. Ouvrir deux terminaux (backend / frontend).

Backend
```powershell
cd ebanking-backend-main/ebanking-backend-main
# Définir la clé OpenAI (temporaire) :
$env:OPENAI_API_KEY = "sk-..."
# Lancer l'application
./mvnw spring-boot:run
```

Frontend
```bash
cd digital-banking-front-main/digital-banking-front-main
npm install
npm start    # ou ng serve
```

Test OAuth + Chat
```powershell
# Obtenir JWT
$token = (Invoke-RestMethod -Method Post -Uri http://localhost:8085/auth/login -Body @{username='user1'; password='12345'} -ContentType 'application/x-www-form-urlencoded')."access-token"
# Appeler l'API chat
Invoke-RestMethod -Method Post -Uri http://localhost:8085/ai/chat -ContentType 'application/json' -Headers @{Authorization = "Bearer $token"} -Body '{"message":"Comment puis-je consulter mon compte ?"}'
```

---

## 📸 Captures d'écran
Place les images dans `docs/screenshots/` puis elles s'afficheront ici :

- ![Accueil admin](docs/screenshots/screenshot-01.png)
- ![Nouveau client](docs/screenshots/screenshot-02.png)
- ![Comptes / opérations](docs/screenshots/screenshot-03.png)
- ![Clients](docs/screenshots/screenshot-04.png)
- ![Interface mobile (menu)](docs/screenshots/screenshot-05.png)
- ![Chatbot - Session](docs/screenshots/screenshot-06.png)
- ![Login page](docs/screenshots/screenshot-07.png)

Pour copier les images depuis tes pièces jointes dans le dossier :
```powershell
mkdir docs\screenshots
# Puis déplace/colle les images dans ce dossier via l'explorateur ou en renommant les fichiers.
```

---

## 🔒 Sécurité & bonnes pratiques
- **Ne pas** stocker les clés (OpenAI, DB, secrets) dans `application.properties` en clair.
- Révoquer immédiatement toute clé exposée et en générer une nouvelle.
- Stocker les secrets dans des variables d'environnement ou un secret manager.
- Ajouter un scan secrets dans la CI pour bloquer les pushes contenant secrets.

---

## 🚀 Roadmap (RAG & Telegram)
Priorités recommandées :
1. Implémenter le pipeline RAG :
   - `EmbeddingService` (appels embeddings)
   - `VectorStore` (index, recherche) — d'abord in-memory pour POC
   - `DocumentIngestionService` (indexer fichiers `docs/`)
   - `RagChatService` (retrieval + prompt + modèle)
2. Endpoint `POST /ai/rag-chat` pour réponses ancrées
3. Intégrer client Telegram (bot) qui relaie les requêtes vers `RagChatService`
4. Tests E2E, dataset d'exemple, documentation

---

## 🧾 Notes utiles
- Branche de travail : `Chatbot`
- Si tu veux, je peux :
  - ajouter le squelette des classes RAG, ou
  - ajouter un script d'ingestion simple et un jeu d'exemples, ou
  - committer ce README et créer le dossier `docs/screenshots/` et y déposer les images si tu me les fournis via le workspace.

---

Si tu veux que j'ajoute ce fichier au Git (branche `Chatbot`) et que je committe directement, dis-le moi et je l'ajoute avec un message de commit clair.

Bonne continuation — dis-moi quelle action tu veux enchaîner (ajouter les images, committer, commencer RAG...).