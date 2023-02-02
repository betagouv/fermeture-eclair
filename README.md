# 🔑 Fermeture éclair

Fermeture éclair is designed to automatically close your repository whenever a [GitGuardian](https://www.gitguardian.com/) incident is triggered. It gives you more time to react appropriately to the leak.

# Prerequisites

-   npm v14
-   node v16

# Setup

```bash
git clone https://github.com/betagouv/fermeture-eclair.git
cd fermeture-eclair
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

# Access prod

The production server is accessible here : [Fermeture éclair](https://betagouv-gitguardian-alert-handler-prod.osc-fr1.scalingo.io/)
