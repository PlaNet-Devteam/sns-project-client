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

## 배포 URL
https://planet-sns.com/ <br/>
id - guest@gmail.com <br/>
pw - test1234# <br/><br/>

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
      - 피드 폼 구성<br>
      - 피드 스크롤 위치 저장 기능 구현<br>
      - MSW 로 피드 mock data 활용
      <li> useInfiniteQuery를 활용한 무한 스크롤</li>
      - 맨 아래로 스크롤을 이동하면 로딩 스피너가 동작하고 React-Query가 서버에 요청<br>
      - 첫번째 데이터는 SSR을 통해 데이터를 미리 가져오고 무한스크롤은 두번째 데이터부터 순차적으로 가져옴<br>
      - 만약 서버에 데이터가 더 없다면? 더 이상 요청을 보내지 않고 중단
      <li> 이미지 캐러셀</li>
      - 이미지를 클릭하면 모달창이 켜지고 해당 이미지를 자세하게 볼 수 있음<br>
      - 이미지가 여러장일 때 이미지를 드래그하면 다음 이미지로 슬라이드
      <li> 스크롤 동작에 따라 동적으로 하단바 출력 방식 리팩토링</li>
      <li> dayjs 날짜 데이터 가공</li>
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
| 인트로 | 로그인 | 회원가입 | 회원가입 |
| --- | --- | --- | --- |
| ![인트로](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/a7adf6ef-9214-4fe9-9c6e-317b4d285c63) | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/ee83323a-5201-4fb4-92f2-908961f49f01" width=230 /> | ![회원가입2](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/4d9548a2-5254-41d9-99d9-95920f2a0986) | ![회원가입](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/2af3e108-e2df-4ac2-bbe7-d26a3cd87629) |

| 피드 등록 | 피드 수정 | 피드 삭제 | 피드 보관 |
| --- | --- | --- | --- |
| ![피드등록](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/7d330323-3f1b-4883-9ebd-e4f53298753d) | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/0efde681-9f31-4ce3-87c0-c27378fb3254" width=230 /> | ![피드삭제](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/a9d4f14e-a3bb-461d-ab1c-570173c05e76) | ![피드보관해제](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/cab23a50-1b8b-4829-9e51-358bce382920) |

| 마이페이지 | 프로필 수정 | 팔로워 삭제 | 비밀번호 변경 |
| --- | --- | --- | --- |
| ![마이페이지](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/ed2f4b44-66f6-4ee5-bca4-bd593c45a648) | ![프로필 수정](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/4c9955f4-99b9-482f-96e3-d8c3df522251) | ![팔로워-삭제](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/8f94793f-4c7e-4b6a-861a-6bbd41f4f9e1) | ![비밀번호변경](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/6fae0c65-a880-478d-b5a4-7e998b9eb0c1) | 

| 유저 검색 | 유저 팔로우 | 유저 차단 |
| --- | --- | --- |
| <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/95199c1f-4eb1-45dd-8912-3f6d496bac48" width=300 /> | ![유저-검색-및-팔로우](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/5c776654-fe58-4346-bdec-03484675fc76) | ![유저차단해제](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/2ee75d8e-eab7-4298-9b99-766037687974) |

| 좋아요 | 북마크 | 404 페이지 | 계종 활성 비활성 | 
| --- | --- | --- | --- |
| <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/d295a3ce-0d75-41df-9899-8ff9bd1bb41f" width=230 /> | ![북마크](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/712cf4c7-c05c-4b8f-a569-f37c35ca6fd7) | ![404](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/96fc2843-6c95-41fa-b2d0-05439196c11b) | <img src="https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/f9fbb591-60d5-4a5d-9f55-5486e629c715" width=230 /> |

| 댓글 등록 | 댓글 수정 | 댓글 정렬 |
| --- | --- | --- |
| ![댓글달기](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/0f7e4ea4-5eef-4d5b-a8bb-9b03e02fe2e8) | ![댓글 수정](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/5fefcc90-8a1b-4c99-b36e-f08e595f1236) | ![댓글 리스트 정렬](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/8fbb5d31-b9a6-414a-941c-12795f3a56f4) |

| 태그 검색 | 피드 태그 검색 | 피드 캐러샐 |
| --- | --- | --- |
| ![태그검색](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/6607560c-4123-4ee4-8fd2-970c2c7f29fe) | ![피드 태그 검색](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/c962040f-72b2-4bf2-875a-511815e11049) | ![피드 캐러샐](https://github.com/PlaNet-Devteam/sns-project-client/assets/52031484/5ea81f87-268c-43bb-959d-e2978e41958e) |




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
