# shop_elice
- NestJS 부트캠프 강의용 프로젝트
  - [프로젝트 정보](#프로젝트-정보)
  - [단계별 구현 절차](#단계별-구현-절차)

------

## 프로젝트 정보

- <b>저장소</b>: https://github.com/joke716/shop_elicelab.git
- <b>기술 스택</b>: NestJS, TypeORM, Docker Compose, PostgreSQL
- <b>개발 환경</b>: 로컬 개발 환경 (배포 설정 없음)
- <b>사용 도구</b>:
  - Database Client (VSCode 확장 프로그램)
  - Docker Desktop
  - Postman Agent

## 단계별 구현 절차

### [1. 기본 설정 및 프로젝트 구조 생성](./_docs/01_initial_setup_and_project_structure/README.md)
- NestJS CLI를 활용한 프로젝트 생성
- 필요한 패키지 설치
- 환경변수 설정 (.env, .env.example)
- ConfigModule 설정

### [2. Docker 컨테이너화](./_docs/02_docker_containerization/README.md)
- Dockerfile과 docker-compose.yml 파일
- Docker Compose 설정
	- NestJS 백엔드 서비스
	- PostgreSQL 데이터베이스 서비스
	- Nginx 웹 서버 서비스
- Nginx 설정

### [3. 데이터베이스 설정](./_docs/03_database_setup/README.md)
- PostgreSQL 데이터베이스 Docker 설정 및 초기 스크립트 작성
- TypeORM 연결 설정
- 기본 엔티티 구성 (BaseEntity, User, Product, Category)
- 각 모듈에서 엔티티 임포트
- Redis 캐시 모듈 설정

### [4. API 문서화 도구 설정](./_docs/04_api_documentation_tools_setup/README.md)
- Swagger 설정 방법
- DTO에 Swagger 데코레이터 적용
- Compodoc 설정

### [5. 기본 모듈 및 기능 구현](./_docs/05_basic_modules_and_feature_implementation/README.md)
- Product 모듈 CRUD 구현
- Category 모듈 CRUD 구현
- Product-Category 관계 설정

### [6. 인터셉터 및 유틸리티 구현](./_docs/06_interceptors_and_utilities_implementation/README.md)
- HTTP 인터셉터 구현
- Transform 인터셉터 구현

### [7. 인증 시스템 구현](./_docs/07_authentication_system_implementation/README.md)
- User 엔티티 생성
- Auth 모듈 구현
	- Local 전략 구현
	- JWT 인증 구현
	- Guard 설정
- 비밀번호 암호화 (bcrypt)
- 사용자 인증 로직 구현
	- 로그인
	- 회원가입
	- 토큰 발급 및 검증

### [8. 토큰 관련 기능 구현](./_docs/08_token_related_features_implementation/README.md)
- Access Token 생성 및 관리
- Refresh Token 생성 및 관리
- Redis를 활용한 토큰 저장 및 검증

### [9. 이메일 인증 기능](./_docs/09_email_verification_feature/README.md)
- 이메일 모듈 구현
- 인증 코드 발송 로직
- Redis를 활용한 인증 코드 저장 및 검증

### [10. 소셜 로그인 연동](./_docs/10_social_login_integration/README.md)
- provider enum 타입 정의
- 소셜 로그인 passport 전략 구현

