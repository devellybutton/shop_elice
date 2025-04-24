###################
# BUILD FOR LOCAL DEVELOPMENT
###################

# Node.js 18 버전의 Alpine 리눅스 이미지를 사용
# 스테이지 이름: 'development'
FROM node:22-alpine As development

# 애플리케이션의 작업 디렉토리를 /usr/src/app으로 설정
WORKDIR /usr/src/app

# 보안을 위해 작업 디렉토리의 소유권을 root에서 node 사용자로 변경
RUN chown -R node:node /usr/src/app

# package.json과 package-lock.json 파일만 먼저 복사하고 소유권을 node 사용자로 설정
# 레이어 캐싱 최적화: 의존성이 변경되지 않으면 다음 빌드 시 이 단계를 재사용
COPY --chown=node:node package*.json ./

# 의존성 패키지 설치
# --force: 호환성 문제 무시
RUN npm install --force

# 현재 디렉토리의 모든 소스 코드를 컨테이너 내부로 복사
# 소유권을 node 사용자로 설정
COPY --chown=node:node . .

# dist 디렉토리가 없을 경우 생성
# 소유권을 node 사용자로 설정
RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app/dist

# 보안을 위해 root 대신 node 사용자로 전환
USER node


###################
# BUILD FOR PRODUCTION
###################

FROM node:22-alpine As build

WORKDIR /usr/src/app

# development 단계에서 설치한 node_modules 디렉토리를 가져옴 (빌드 시간 단축)
COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN chown -R node:node /usr/src/app/dist

# 프로덕션에 필요한 의존성만 설치하고 npm 캐시 정리 (이미지 크기 감소)
RUN npm install --only=production && npm cache clean --force

USER node


###################
# PRODUCTION
###################

FROM node:22-alpine As production

WORKDIR /usr/src/app

# build 단계에서 설치한 프로덕션 의존성만 복사
# build 단계에서 생성된 컴파일된 코드만 복사
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

RUN chown -R node:node /usr/src/app/dist

# 컨테이너 실행 시 dist/main.js 파일을 실행
CMD [ "node", "dist/main.js" ]