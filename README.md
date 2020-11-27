<p align="center">
    <img src="https://user-images.githubusercontent.com/26402298/99673762-8a71e080-2ab8-11eb-84ca-909703fae826.png"
    width="549" />
</p>

<p align="center">
    <img src="https://github.com/qkrdmstlr3/svg-icon-animation/blob/master/map-icon/map-icon.svg" height="300" />
</p>



![react](https://img.shields.io/badge/react-17.0.1-9cf?logo=react)
![typescript](https://img.shields.io/badge/typescript-4.0.5-blue?logo=typescript)
![mapbox](https://img.shields.io/badge/mapbox-1.12.0-darkblue?logo=mapbox)
![redux](https://img.shields.io/badge/redux-4.0.5-purple?logo=redux)



## 프로젝트 소개

사용자가 직접 지도의 다양한 요소에 대한 스타일을 조정하고 URL 또는 JSON 형식으로 내보낼 수 있는 툴입니다.

<p align="center">
    <img src=https://user-images.githubusercontent.com/57997672/100355732-9cfa9580-3035-11eb-91e6-60c56466933a.png  />
    <br />
    <br />
    <img src=https://i.imgur.com/KNk0TvT.jpg />
</p>


## 개발 목표

- 컴포넌트 렌더링 최적화
    1. 프레임 속도 : 크롬 기준 60fps
    
- [Google Styling Wizard](https://mapstyle.withgoogle.com/) 클론
    - mapbox API 사용
    - 자세한 feature list는 아래의 링크를 참고
    
- 단순한 클론에서 나아가 사용자가 커스텀 가능한 부가 기능을 아래와 같이 추가

    1. 마커 + 텍스트 생성 가능
        - 특정 장소에 대한 표기 기능
        - 지도에서 우클릭하면 마커 생성 가능 모달 뜨고 누르면 마커 생성됨
        - 마커 우클릭하면 마커 제거 모달 뜨고 누르면 마커 제거됨
        - 마커 hover시 텍스트 표기. 텍스트는 마커 상단에 표기
        - 단 입력가능한 텍스트 길이는 10자 제한
        - 사이드바에 마커 스타일링 메뉴 추가 : 기본 마커 스타일을 사용자가 조정할 수 있음
    2. 히스토리를 이용한 비교하기 구현
        - 사용자가 스타일 적용 전후를 비교하는 기능.
        - 히스토리 리스트 중 비교하고 싶은 스타일을 선택할 수 있음
        - 선택된 스타일과 현재 스타일이 분할된 화면으로 비교됨 
    3. 라벨위에 hover시 url이 뜨고 누르면 포털의 해당 장소에 대한 검색 결과 화면으로 이동
    4. 추가 예정(후보.. 애니메이션으로 길 그리기?)

- 클론 및 부가 서비스 구현을 위한 [feature list](https://docs.google.com/spreadsheets/d/11tz41NW_KiwJqWJrQRA_aTWBqdjliKSvJFtq_idEmXY/edit#gid=1215517442)

### 팀원

- [J082 박은식](https://github.com/qkrdmstlr3)
- [J123 위정훈](https://github.com/gitgitWi)
- [J151 이연정](https://github.com/yyjjjj)
- [J159 이준희](https://github.com/GodDrinkTeJAVA)
- [J154 이은솔](https://github.com/Eunsol0410)

### 폴더 구조

```
.
├── public
└── src
    ├── components
    │   ├── Icon
    │   ├── Map
    │   │   ├── ButtonGroup
    │   │   └── SearchInput
    │   └── Sidebar
    │       ├── SidebarContentFewer
    │       ├── SidebarContentMore
    │       ├── SidebarFooter
    │       ├── SidebarHeader
    │       └── SidebarModal
    ├── hooks
    │   ├── common
    │   ├── map
    │   └── sidebar
    ├── pages
    ├── store
    │   ├── common
    │   ├── map
    │   └── style
    └── utils
        ├── rendering-data
        └── styles
```
