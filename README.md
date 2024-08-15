# Foomee

![Cover](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fbfb5a48f-115e-4757-a1dd-1b668428a1fa%2Fe80fbf93-39c3-4640-85c7-af6d6cdb914f%2Fimage.png?table=block&id=39a42436-7475-4bec-897e-24b4f7df4b40&spaceId=bfb5a48f-115e-4757-a1dd-1b668428a1fa&width=2000&userId=20a52541-f6a7-4160-bec8-f1855dc5f692&cache=v2)

## 목차

- [1. 프로젝트 소개 및 개요](#1-프로젝트-소개-및-개요)
- [2. 기술스택 및 개발환경](#2-기술스택-및-개발환경)
- [3. 폴더 구조](#3-폴더-구조)
- [4. 구현 기능](#4-구현-기능)
- [5. User Flow](#5-user-flow)
- [6. 스크린샷](#6-스크린샷)
- [7. 핵심 기능 및 코드](#7-핵심-기능-및-코드)
- [8. 트러블슈팅](#8-트러블슈팅)
- [9. Branch 전략](#9-branch-전략)
- [10. 문서](#10-문서)
- [11. 리팩토링](#11-리팩토링)
- [12. 회고](#12-회고)


## **1. 프로젝트 소개 및 개요**

- 프로젝트 기간 : 2024.07.29 ~ `진행중`
- [배포 URL 🔗](https://foomee.vercel.app/)
- Notion 🔗

`Foomee` 프로젝트는 사용자가 자신의 건강을 효율적으로 관리할 수 있도록 돕기 위한 솔루션을 제공합니다. 본 솔루션은 영양성분 API를 활용하여 사용자가 섭취한 음식의 `영양 성분을 정확하게 분석`하며, 일별 `식단과 체중 기록`을 체계적으로 관리할 수 있는 기능을 제공합니다. 또한, `시각적 차트`를 통해 건강 데이터를 직관적으로 파악할 수 있으며, 챗봇을 통해 `개인 맞춤형 식단 피드백`을 제공함으로써 사용자 경험을 향상시키고자 합니다. 이 프로젝트는 사용자들이 보다 효과적으로 건강을 유지하고 개선할 수 있도록 돕는 것을 목표로 합니다.

### [핵심 기능]

1. **영양 성분 분석**
    - 영양성분 API를 활용하여 사용자가 입력한 식단의 영양 성분을 분석합니다.
    - 일일 섭취량과 권장 섭취량을 비교하여 건강 상태를 모니터링합니다.
2. **식단 및 체중 기록**
    - 사용자가 섭취한 음식과 체중을 일별로 기록할 수 있습니다.
    - 기록된 데이터를 캘린더 형식으로 제공하여, 식단과 체중 변화를 한눈에 쉽게 확인할 수 있습니다.
3. **데이터 시각화**
    - 사용자의 식단 및 체중 데이터를 다양한 차트로 시각화합니다.
    - 칼로리 섭취, 영양소 비율, 체중 변화 등을 직관적으로 확인할 수 있습니다.
4. **챗봇 피드백**
    - 사용자의 식단 데이터를 바탕으로 챗봇이 개인 맞춤형 피드백을 제공합니다.
    - 건강 목표에 맞춘 식단 제안 및 조언을 실시간으로 받을 수 있습니다.

### [프로젝트 일정]

`캡쳐 추가 예정`

## 2. 기술스택 및 개발환경

- 코어: `Next.js`, `Typescript`
- Style: `tailwindCSS`
- 통신: `FetchAPI`
- 상태관리: `React Query`, `Zustand`
- build, 배포: `Vercel`, `AWS EC2`, `Github Actions`
- 기타 라이브러리: `chart.js`, `next-auth`, `react-calendar`, `react-hook-form`, `moment`
- Formatter: `eslint`, `prettier`
- API: [공공데이터포털 | 영양성분 데이터 🔗](https://www.data.go.kr/data/15100064/standard.do#/tab_layer_open), `OPENAI API`
- DB: `MongoDB`

## **3. 폴더 구조**

`추가 예정`

## **4. 구현 기능**

`추가 예정`

## **5. User Flow**

![FESP2 project figjam.png](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fbfb5a48f-115e-4757-a1dd-1b668428a1fa%2F8480a773-c75b-4a64-9a5f-7a62a73734c8%2Fimage.png?table=block&id=5f8b7f23-3cc5-4745-bbab-19dbf1df101f&spaceId=bfb5a48f-115e-4757-a1dd-1b668428a1fa&width=2000&userId=20a52541-f6a7-4160-bec8-f1855dc5f692&cache=v2)

## **6. 스크린샷**

`추가 예정`

## 7. 핵심 기능 및 코드

`추가 예정`

## 8. 트러블슈팅

`추가 예정`

## 9. Branch 전략

**main - develop - feature**

- **main** : 프로덕션용 브랜치 (배포용)
- **develop** : 통합 및 테스트용 브랜치 (기능 병합)
- **feat/이슈번호-기능** : 기능별 작업용 브랜치

### 커밋 컨벤션

| keyword | description |
| --- | --- |
| FEAT | 새로운 기능 추가 |
| FIX | 버그 수정 |
| DOCS | 문서 작업 |
| DELETE | 기능이 삭제될 때 |
| STYLE | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 |
| CHORE | 빌드 업무 수정, 패키지 매니저 수정 |
| DESIGN | CSS 등 사용자 UI 디자인 변경 |
| REFACTOR | 코드 리팩토링 |
| TEST | 테스트 |
| INIT | 프로젝트 초기 생성 |
| RENAME | 파일 혹은 폴더명을 수정하거나 옮기는 작업 |
| REMOVE | 파일을 삭제하는 작업만 수행한 경우 |

## 10. 문서

[🖥️ 개발일지](https://www.notion.so/f7f2ffc731f8401a828acdbb30cdd068?pvs=21)

[📋 기능 명세서](https://www.notion.so/ba15e11fcd5c46debc8de60e295ac50a?pvs=21)

[🎨 Figma | 와이어프레임](https://www.figma.com/design/LmQzCnWpU99RaJEYYiVJiC/FESP2-project-figma?node-id=2-2&t=zQu8JNTBubhipiXF-1)

[🎨 Figma | 디자인](https://www.figma.com/design/LmQzCnWpU99RaJEYYiVJiC/FESP2-project-figma?node-id=2-3&t=zQu8JNTBubhipiXF-1)

[🎨 Figma | 프로토타입](https://www.figma.com/design/LmQzCnWpU99RaJEYYiVJiC/FESP2-project-figma?node-id=0-1&t=zQu8JNTBubhipiXF-1)

## 11. 리팩토링

`추가 예정`

## 12. 회고

`추가 예정`