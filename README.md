# 🔑 Fermeture éclair

Fermeture éclair is designed to automatically close your repository whenever a [GitGuardian](https://www.gitguardian.com/) incident is triggered. It gives you more time to react appropriately to the leak.

# Prerequisites

-   npm v14
-   node v16

# Setup

```bash
git clone https://github.com/betagouv/git-guardian-alert-handler.git
cd git-guardian-alert-handler
npm i
cp .env.example .env
```

# Run locally

Run server:

```bash
docker-compose up
```

Run client:

```bash
cd src/client && npm run start
```
