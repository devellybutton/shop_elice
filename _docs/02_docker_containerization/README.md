# Docker 컨테이너화
- [1. Dockerfile 생성](#1-dockerfile-생성)
- [2. docker-compose.yml 생성](#2-docker-composeyml-생성)
- [3. .dockerignore 파일 생성](#3-dockerignore-파일-생성)
- [4. 컨테이너 실행 및 확인](#4-컨테이너-실행-및-확인)

## 도커 왜 써야될까?
- '제 컴퓨터에서는 안 됩니다' 같은 환경 차이로 인한 문제를 방지
- 호스트 OS의 커널만 공유, 나머지 부분인 라이브러리, 애플리케이션은 각 컨테이너가 독립적으로 가져감. <br>
=> 격리된 환경 제공
    -  격리된 환경 제공 : 컨테이너가 <b>호스트 OS에서 실행 중인 다른 프로세스나 다른 컨테이너의 영향을 받지 않고</b> 독립적으로 실행된다는 것
- 운영체제(OS) = 쉘 + 커널(핵심)
    - 쉘 : 사용자와 OS가 상호작용하는 인터페이스
    - 커널 : 하드웨어와 소프트웨어의 중개자 역할 

## 파일 설명
- `Dockerfile`: NestJS를 위한 공식 이미지가 없어서 직접 작성한 서버 이미지 파일
- `docker-compose.yml`: 서버 이미지뿐만 아니라 다른 서비스들(DB, Redis 등)을 함께 구성하고 네트워크, 포트 등을 설정 (여러 컨테이너 관리)
    - 안 그러면 개별적으로 docker run 명령어를 입력해야 됨
- `.dockerignore`: Docker 이미지 빌드 시 불필요한 파일을 제외하여 이미지 크기를 최적화하기 위해 사용

## 1. Dockerfile 생성
- 3단계의 멀티 스테이지 빌드로 구성
- node 사용자에게 권한 부여, node 사용자 사용

### 1) Development 단계
- 목적: 개발환경 설정
- 모든 의존성 설치
- 소스 코드 전체 복사

### 2) Build 단계
- 목적: 앱 프로덕션 전 빌드
- 캐싱
    - Development 단계의 node_modules 재사용
    - package.json 파일을 먼저 복사하고 의존성 설치
- TypeScript 코드 컴파일 (npm run build)

### 3) Production 단계
- 목적: 최종 프로덕션 이미지 생성
- 최소한의 필요 파일만 포함 (빌드된 dist 폴더와 프로덕션 의존성만)

## 2. docker-compose.yml 생성
### 서비스 이름 vs 컨테이너 이름
- <b>서비스 이름</b>: Docker Compose에서 사용하는 논리적 이름
    - `docker-compose.yml` 파일 내에서 서비스를 참조할 때 사용
- <b>컨테이너 이름</b>: 실제 생성되는 Docker 컨테이너의 이름 
    - 명시적으로 지정하지 않으면 Docker Compose는 프로젝트명_서비스명_번호 형식으로 자동 생성

### depends_on의 의미
-서비스 시작 순서를 제어
    - 예: elicelab_nginx는 elicelab_backend가 시작된 후에 시작됨
- 단순히 시작 순서만 보장하며, 서비스가 완전히 준비되었는지는 보장하지 않음

### target: development의 의미
- 멀티스테이지 Dockerfile에서 특정 단계를 지정
- 여기서는 Dockerfile의 development 스테이지를 사용하도록 지정하여 개발 환경용 이미지를 빌드

### 주요 구성 요소 설명
#### 볼륨(volumes)
- `.:/usr/src/app`: 로컬 소스 코드를 컨테이너와 동기화하여 코드 변경 시 즉시 반영
- `/usr/src/app/node_modules`: 익명 볼륨, 컨테이너 내 node_modules가 호스트와 분리되어 의존성 충돌을 방지

#### 네트워크(networks)
- 도커 기본 네트워크는 IP로만 통신 가능, 이름 해석 불가
- 모든 서비스는 같은 elicelab-network에 연결됨 
- 브릿지 네트워크를 사용하여 컨테이너 간 서비스 이름으로 통신이 가능
    - 예: backend 컨테이너에서 elicelab_db 호스트명으로 데이터베이스 접근 가능

#### 환경 변수(env_file)
- 모든 서비스가 같은 .env 파일을 참조

## 3. `.dockerignore` 파일 생성
- Docker 이미지 빌드 과정에서 불필요한 파일을 제외 <br>
=> 이미지 크기를 줄이고 빌드 속도를 향상

## 4. 컨테이너 실행 및 확인

### 포트 충돌 오류
```
Error response from daemon: Ports are not available: exposing port TCP 0.0.0.0:5432 -> 0.0.0.0:0: listen tcp4 0.0.0.0:5432: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.
```
#### 1) 포트 번호 바꿔주기
#### 2) 또는 관리자 권한으로 해당 포트에서 실행중인 프로세스 종료 

![Image](https://github.com/user-attachments/assets/1cdedb57-5643-403d-8acd-bf2ef86d8ac7)

![Image](https://github.com/user-attachments/assets/220b2da2-fda7-4aed-b952-b53e8162b3bd)