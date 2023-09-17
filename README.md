<div align="center">
  <img src="https://avatars.githubusercontent.com/u/130982389?s=200&v=4" width="100px" height="100px"/>
  <h2>PlaNet-Devteam</h2>
  <b>🚀 우주 테마 소셜 네트워크 PlaNet 🚀</b>
</div>
  <br/>
<div align="center">

| <img src="https://avatars.githubusercontent.com/u/96197310?v=4" width="200px" height="200px"> | <img src="https://avatars.githubusercontent.com/u/52031484?v=4" width="200px" height="200px"> | <img src="https://avatars.githubusercontent.com/u/101001956?v=4" width="200px" height="200px"> | <img src="https://avatars.githubusercontent.com/u/67294348?v=4" width="200px" height="200px"> |
| :-------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------: |
|                   [강명주<br/>(@myungju030)](https://github.com/myungju030)                   |                   [김보라<br/>(@rockbell89)](https://github.com/rockbell89)                   |                 [정민상<br/>(@jeongminsang)](https://github.com/jeongminsang)                  |                      [이민형<br/>(@lsx2003)](https://github.com/lsx2003)                      |

</div>
<br/>

## Contents

- [👨‍👨‍👧‍👦 Role](#role)
- [📃 Pages](#pages)
- [⚙ Tech Stack](#tech-stack)
- [🔗 Git](#git)

<br/>

## Role

<details markdown="1">
  <summary>강명주 (@myungju030)</summary>
  <div>
    <ul>
      <li>공통 컴포넌트</li>
      - 공통으로 사용할 버튼, 모달창 구현
      <li>피드 페이지</li>
      - 피드 생성, 수정 기능 구현<br>
      - 피드 이미지 업로드 구현<br>
      - useMouseDrag 커스텀 훅을 통한 좌우 스크롤 기능 구현
      <li>README.md 작성</li>
    </ul>
  </div>
</details>

<details markdown="1">
  <summary>김보라 (@rockbell89)</summary>
  <div>
    <ul>
      <li> 레이아웃</li>
      - 로그인 상태여부에 따른 레이아웃 구분
      <li> 인트로 & 404 에러</li>
      - 인트로 화면 CSS 애니메이션 적용<br>
      - 404 에러페이지 CSS 애니메이션 적용
      <li> 회원가입 & 로그인</li>
      - 회원가입 및 로그인 기능 구현 <br>
      - useForm 커스텀 훅을 통한 폼 데이터 상태 관리<br>
      - 로그인 시 recoil 및 cookie를 통한 유저정보 상태 관리
      <li> 프로필 페이지</li>
      - 프로필 정보 및 유저별 피드 목록 구현 <br>
      - 프로필 수정 기능 구현<br>
      - 프로필 이미지 업로드  기능 구현
      <li> 기타</li>
      - useInfinityScroll 커스텀 훅 리팩토링 <br>
      - 서버 유저정보 수정 구현<br>
      - 서버 피드 CRUD  구현
    </ul>
  </div>
</details>

<details markdown="1">
  <summary>정민상 (@jeongminsang)</summary>
  <div>
   <ul>
      <li> 피드 페이지</li>
      - SSR 을 활용한 첫 피드 데이터 페칭<br>
      - 이미지 데이터의 갯수에 따라서 피드에 출력되는 방식 변경<br>
        &nbsp;&nbsp;&nbsp; 1개라면? 꽉 채워서 출력<br>
        &nbsp;&nbsp;&nbsp; 2개라면? 양옆에 나눠서 출력<br>
        &nbsp;&nbsp;&nbsp; 3개라면? 위에 2개 아래 1개 나눠서 출력<br>
        &nbsp;&nbsp;&nbsp; 4개 이상이라면? 최대 4개까지 출력하고 나머지는 모달창을 통해 확인 가능
      <li> 무한 스크롤</li>
      - 맨 아래로 스크롤을 이동하면 로딩 스피너가 동작하고 React-Query가 서버에 요청<br>
      - 첫번째 데이터는 SSR을 통해 데이터를 미리 가져오고 무한스크롤은 두번째 데이터부터 순차적으로 가져옴<br>
      - 만약 서버에 데이터가 더 없다면? 더 이상 요청을 보내지 않고 중단
      <li> 이미지 캐러셀</li>
      - 이미지를 클릭하면 모달창이 켜지고 해당 이미지를 자세하게 볼 수 있음<br>
      - 이미지가 여러장일 때 이미지를 드래그하면 다음 이미지로 슬라이드
    </ul>
  </div>
</details>

<details markdown="1">
  <summary>이민형 (@lsx2003)</summary>
  <div>
   <ul>
      <li>프로젝트 초기설정</li>
      <li>AWS S3 버킷 이미지 업로드 구현</li>
    </ul>
  </div>
</details>

## Pages

### 🚀 User

|                                                                      회원가입                                                                      |                                                                       로그인                                                                       |                                                                   프로필 페이지                                                                    |                                                                    프로필 수정                                                                     |
| :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/3c38e897-55d2-4869-b288-f81e91ceaa1f" width="150px" height="200px"> | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/f356cc37-8161-484f-af91-2f04ed49a7c0" width="150px" height="200px"> | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/21c4d8a1-aece-4d22-b18d-2831caa1b41d" width="150px" height="200px"> | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/949643fa-b6a0-41f8-8435-fb47a079734c" width="150px" height="200px"> |

### 🚀 Feed

|                                                                     피드 목록                                                                      |                                                                    무한 스크롤                                                                     |                                                                       캐러셀                                                                       |                                                                        생성                                                                        |                                                                     수정&삭제                                                                      |
| :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/a87c194d-c6f2-4b66-a950-a6340ea41b32" width="150px" height="200px"> | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/abe35ddd-3fbd-499c-8f3f-cecba74e01bd" width="150px" height="200px"> | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/425023ed-79da-4c7a-9219-a232bcb86fd5" width="150px" height="200px"> | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/2ef94175-4b2f-4330-a8db-f947d9a0e562" width="150px" height="200px"> | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/1b70e230-8fbf-42cb-885d-a826b5c36a2e" width="150px" height="200px"> |

### 🚀 Etc.

|                                                                       인트로                                                                       |                                                                      404에러                                                                       |
| :------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/49adea30-2772-4831-ba88-d8087c0738ec" width="150px" height="200px"> | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/862b34cc-8ac3-4192-bff7-0ffa29a50c05" width="150px" height="200px"> |

<br/>

## Tech Stack

![PlaNet](https://github.com/PlaNet-Devteam/sns-project-client/assets/96197310/358b2921-6ccb-41c2-b857-ee072d96bc0c)

## Git

### 🌿 Branch

- main : 서비스 운영 브랜치
- dev : 개발중인 브랜치
- feat/기능명 : 기능 개발 브랜치

<br/>

### 💌 Commit Message

| Message  |                             설명                             |
| :------: | :----------------------------------------------------------: |
|   init   |                          초기 설정                           |
|   feat   |                       새로운 기능 추가                       |
|   fix    |                          버그 수정                           |
|   docs   |                          문서 수정                           |
| refactor |                        코드 리팩터링                         |
|   test   | 테스트 코드, 리팩터링 테스트 코드 추가(프로덕션 코드 변경 X) |
|  chore   |   빌드 업무 수정, 패키지 매니저 수정(프로덕션 코드 변경 X)   |
|  rename  |      파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우      |
