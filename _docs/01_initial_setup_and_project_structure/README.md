# 기본 설정 및 프로젝트 구조 생성
- [1. NestJS 프로젝트 생성](#1-nestjs-프로젝트-생성)
- [2. 기본 모듈 설정](#2-기본-모듈-설정)
- [3. 의존성 패키지 설치](#3-의존성-패키지-설치)
- [4. 환경변수(.env) 설정](#4-환경변수env-설정)
- [5. ConfigModule 설정](#5-configmodule-설정)

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

### 1) package.json 파일 붙여놓고 npm i

### 2) 혹은 아래 명령어 터미널에 입력
```
# 환경설정 관련
npm install @nestjs/config @hapi/joi @types/hapi__joi

# 데이터베이스 관련
npm install @nestjs/typeorm typeorm pg

# 인증 관련
npm install @nestjs/passport @nestjs/jwt passport passport-jwt passport-local
npm install @types/passport-jwt @types/passport-local
npm install bcryptjs @types/bcryptjs
npm install cookie-parser @types/cookie-parser

# 캐시 관련
npm install cache-manager@4.1.0 cache-manager-redis-store@2.0

# 이메일 관련
npm install nodemailer @types/nodemailer

# 유틸리티 관련
npm install gravatar @types/gravatar

# 클래스 유효성 검사 및 변환
npm install class-validator class-transformer

# API 문서화
npm install @nestjs/swagger swagger-ui-express
```

## 4. 환경변수(.env) 설정

### 1) `.gitignore` 파일에 env 관련 내용 확인:
```
dotenv environment variable files
.env
.env.*
!.env.example  # .env.example 파일만 예외로 허용 
```

### 2) .env.example와 .env 파일 생성
- `.env.example` 파일은 프로젝트에 필요한 환경 변수의 구조를 공유하기 위한 템플릿
이 파일을 복사하여 `.env` 파일을 만들고 실제 환경에 맞는 값으로 수정하여 사용
    - `.env` : 커밋 추적되지 않음 (Git에 의해 무시됨)
    - `.env.example` : 커밋 추적됨 (저장소에 올라감)

## 5. ConfigModule 설정
- NestJS의 ConfigModule을 사용하여 환경 변수를 중앙에서 관리하는 시스템
    - Joi를 통해 필요한 환경 변수들의 존재 여부와 형식을 검증(실행 전 확인)
    - 서버 전체에서 일관된 방식으로 접근 가능
    - 직접 process.env를 사용하는 대신 타입 안전성과 유효성 검증을 갖춘 구조화된 설정 관리 방식을 제공
- 참고: [NestJS 공식문서 - Techniques > configuration](https://docs.nestjs.com/techniques/configuration)

#### 1) `Config.module.ts` 파일을 생성하고 `@nestjs/config` 패키지에서 제공하는 ConfigModule과 ConfigService를 불러옴.
#### 2) `configuration.ts` 파일을 생성하여 Joi를 사용한 커스텀 검증 스키마를 정의
#### 3) 타입 안전성을 위해 IConfig 인터페이스를 생성하여 환경 변수의 타입을 명시
#### 4) AppModule에 ConfigModule이 올바르게 임포트되어 있는지 확인
-  NestJS CLI로 모듈을 생성했을 경우 자동으로 AppModule에 import되지만, 수동으로 파일을 직접 생성했다면 AppModule에 해당 모듈을 직접 import 해야됨 

#### 5) 환경변수 변경하여 디버깅
- 서버 실행할 때 이런 메시지가 나온다면 잘 검증된다는 의미

    ![Image](https://github.com/user-attachments/assets/acfc2450-c977-4001-a636-947ee3ec07e2)

<details>
<summary><i>Joi.validate is not a function 오류 해결</i></summary>

![Image](https://github.com/user-attachments/assets/b889e888-2bb7-4546-9b25-a74518a55a1b)

- **load**에는 환경 변수 값을 로드하는 함수(configuration)를 넣음

- **validationSchema**에는 그 함수에서 반환하는 Joi 검증 스키마(configuration())를 넣는 구조

</details>