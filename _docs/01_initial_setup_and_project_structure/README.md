# 기본 설정 및 프로젝트 구조 생성

## 1. NestJS 프로젝트 생성
### NestJS CLI 설치
```
npm i -g @nestjs/cli
```

### 새 프로젝트 생성
```
nest new shop_elicelab (프로젝트명)
```
```
nest new . (현재 위치에 생성)
```
- 패키지 매니저: `npm` 선택

### 프로젝트 디렉토리로 이동 혹은 생략 가능
```
cd shop_elicelab
```

## 2. 기본 모듈 설정
```
# 주요 모듈 생성
nest g module user
nest g module product
nest g module auth
nest g module email
nest g module database
nest g module redis
nest g module config
nest g module comment
nest g module common

# 컨트롤러 생성
nest g controller user
nest g controller product
nest g controller comment
nest g controller auth

# 서비스 생성
nest g service user
nest g service product
nest g service email
nest g service comment
nest g service auth
```

## 3. 의존성 패키지 설치

## 4. 환경변수(.env) 설정