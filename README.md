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

## 프로젝트 소개 🗺️

> **배포주소 [http://map-styler.kro.kr/](http://map-styler.kro.kr/)**

`Mapbox` API를 활용하여 `Google MapStyle`을 클론한 커스텀 스타일 지도 편집기입니다. 색상, 굵기, visibility 조정, 테마 선택, 가시성 조절 등 주요 기능을 클론하였고, 히스토리를 활용한 비교하기 및 undo-redo 기능, 마커 표시, URL / JSON 형식으로 스타일 내보내기 및 가져오기 등 부가 기능을 추가하였습니다.

<br />

## 팀원 소개


| [J082 박은식](https://github.com/qkrdmstlr3) 👨‍🎨 | [J123 위정훈](https://github.com/gitgitWi) 🤵 | [J151 이연정](https://github.com/yyjjjj) 👩‍🎓 | [J154 이은솔](https://github.com/Eunsol0410) 👩‍🔧 | [J159 이준희](https://github.com/GodDrinkTeJAVA) 🙇‍♂️ |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------------------------------------------------- |:------------------------------------------------------:|
|  <img src="https://i.imgur.com/zf2Axpj.png" width="150px" /> | <img src="https://ca.slack-edge.com/T019JFET9H7-U019P681UQ2-23107d5af843-512" width="150px" alter="위정훈" /> | <img src="https://i.imgur.com/rEhXirW.jpg"  width="150px" /> |  <img src="https://i.imgur.com/XSQ9qrQ.png" width="150px" />  |   <img src="https://i.imgur.com/AYqKXAO.jpg" width="150px" />                                                     |
| 각종 이미지 담당 | Pin 담당 | HackMD 담당 | 사다리 담당 | 부끄러움 담당 |

<br />

## 개발 목표

- 컴포넌트 렌더링 최적화: 프레임 속도 크롬 기준 60fps
    
- [Google Styling Wizard](https://mapstyle.withgoogle.com/) 클론
    - mapbox API 사용
    - 자세한 feature list는 아래의 링크를 참고
    
- 단순한 클론에서 나아가 사용자가 커스텀 가능한 부가 기능을 아래와 같이 추가

    1. 마커 + 텍스트 생성 가능
        - [x] 특정 장소에 대한 표기 기능
        - [x] 지도에서 우클릭하면 마커 생성 가능 모달 뜨고 누르면 마커 생성됨
        - [x] 마커 우클릭하면 마커 제거됨
        - [x] 마커 click시 텍스트 표기. 텍스트는 마커 상단에 표기
        - [x] 단 입력가능한 텍스트 길이는 10자 제한
        - [ ] 사이드바에 마커 스타일링 메뉴 추가 : 기본 마커 스타일을 사용자가 조정할 수 있음

    2. 히스토리를 이용한 비교하기 구현
        - [x] 사용자가 스타일 적용 전후를 비교하는 기능.
        - [x] 히스토리 리스트 중 비교하고 싶은 스타일을 선택할 수 있음
        - [x] 선택된 스타일과 현재 스타일이 분할된 화면으로 비교됨 
    3. Undo / Redo 기능 구현
        - [x] 사용자의 지도 스타일 적용에 대하여 Undo / Redo 가능
    4. 라벨위에 hover시 url이 뜨고 누르면 포털의 해당 장소에 대한 검색 결과 화면으로 이동
        - [ ] 구현

- 클론 및 부가 서비스 구현을 위한 [feature list](https://docs.google.com/spreadsheets/d/11tz41NW_KiwJqWJrQRA_aTWBqdjliKSvJFtq_idEmXY/edit#gid=1215517442)

<br />

## 주요 서비스

### 지도 스타일 편집 서비스

<img src="https://i.imgur.com/etAhAWQ.gif" width=80% height=80% />

- 지도의 분류된 속성(POI, 도로, 교통 등)별로 가시성, 색상, 굵기, 채도 명도를 자유자재로 조절할 수 있습니다.

### 테마 설정하기

<img src="https://i.imgur.com/eME5mi8.gif" width=80% height=80% />

- 팀원으로부터 엄선된 기본 스타일 테마를 제공합니다.

### 표기 단계 조절하기

<img src="https://i.imgur.com/G0LeSRI.gif" width=80% height=80% />

- 행정구역 / 도로의 표기 단계를 조절할 수 있습니다.
- 선택하는 단계에 따라 행정구역 혹은 도로가 보여지는 밀도가 달라집니다.

### import/export

<img src="https://i.imgur.com/jVL26iR.gif" width=80% height=80% />

- `export`: 소중한 사용자의 테마를 잃어버리지 않도록, 스타일을 JSON과 URL로 보관할 수 있습니다.
- `import`: export한 url을 통해 기존에 스타일링 했던 지도의 모습을 확인할 수 있습니다. 또한 export  했던 json 파일을 import 하여 해당 모습에서 스타일 적용을 이어나갈 수 있습니다.

### 편집 히스토리 서비스

<img src="https://i.imgur.com/d2ZU3tZ.gif" width="80%" />

- 사용자가 편집했던 로그를 최신순으로 확인할 수 있습니다.
- 현재 보여지는 화면의 log는 초록색 글씨로 표시됩니다.

### 편집 전후 비교하기 서비스

<img src="https://i.imgur.com/CTkmb3H.gif" width="80%" />

- 히스토리 로그에서 과거 로그 선택를 선택하면, 현재 편집 결과와 비교할 수 있습니다.
- 이때 현재 모습과 비교하고자 선택했던 히스토리 항목이 히스토리 목록에서 회색으로 나타납니다.

### undo / redo 기능

<img src="https://i.imgur.com/Jak5ESK.gif" width="80%" />

- `reset` undo / redo 버튼의 오른쪽에 위치한 드롭다운 버튼을 통해 reset 기능에 접근할 수 있습니다. reset 기능으로 초기 스타일로 돌아갈 수 있습니다.
- `undo/redo` 변경사항을 취소하거나 다시 적용하고 싶은 경우, 클릭 한 번으로 쉽게 되돌릴 수 있습니다.

### 마커 기능

<img src="https://i.imgur.com/xdUeyRI.gif" width="80%" />

- 마우스 우클릭으로 마커 추가 및 텍스트 입력이 가능합니다.
- 마커를 클릭하면 입력한 텍스트 팝업을 볼 수 있습니다.
- 마우스 drag & drop으로 마커 위치 수정과 우클릭으로 삭제가 가능합니다.


