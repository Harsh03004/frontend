# syntax=docker/dockerfile:1
ARG NODE_VERSION=23.7.0
FROM node:${NODE_VERSION}-alpine

ENV NODE_ENV=development

WORKDIR /usr/src/app

# Install dependencies (include devDependencies for vite)
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci

# Copy source code
COPY . .

# Fix permissions for non-root user
RUN chown -R node:node /usr/src/app

USER node

EXPOSE 5173

CMD ["npm", "run", "dev","--", "--host"]
