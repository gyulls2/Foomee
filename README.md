# Foomee

![Cover](https://github.com/gyulls2/Foomee/blob/main/public/images/readme/cover.png?raw=true)

## 목차

1. [프로젝트 소개 및 개요](#프로젝트-소개-및-개요)
2. [기술 스택 및 개발 환경](#기술-스택-및-개발-환경)
3. [User Flow](#user-flow)
4. [UI 구성 요소](#ui-구성-요소)
5. [핵심 기능 및 코드](#핵심-기능-및-코드)
   - [5-1. ChatGPT 프롬프트 생성](#5-1-chatgpt-프롬프트-생성)
   - [5-2. 자동 빌드 및 배포(CI/CD)](#5-2-자동-빌드-및-배포cicd)
   - [5-3. Swiper 라이브러리를 활용한 무한히 과거로 가는 차트 생성](#5-3-swiper-라이브러리를-활용한-무한히-과거로-가는-차트-생성)
   - [5-4. 무한스크롤 커스텀 훅](#5-4-무한스크롤-커스텀-훅)
6. [트러블슈팅](#트러블슈팅)
   - [6-1. NextAuth 네이버 소셜 로그인 expires_in Type Error](#6-1-nextauth-네이버-소셜-로그인-expires_in-type-error)
7. [Branch 전략](#branch-전략)
8. [문서](#문서)
9. [User Test](#user-test)
10. [회고](#회고)

## **1. 프로젝트 소개 및 개요**

- 프로젝트 기간 : 2024.07.29 ~ 2024.08.28
- [배포 URL 🔗](https://foomee.vercel.app/)
- [Notion 🔗](https://nifty-airmail-658.notion.site/405c1e6905064eb797f037787093baee?v=36303f63f46d41519e6b739b2a50e82b&pvs=4)

`Foomee` 프로젝트는 사용자가 자신의 건강을 효율적으로 관리할 수 있도록 돕기 위한 `개인 맞춤형 식단 기록, 분석 서비스` 입니다.

식약처 영양성분 API를 활용하여 사용자가 섭취한 음식의 `영양 성분을 정확하게 분석`하며, `식단과 체중 기록`을 체계적으로 관리할 수 있는 기능을 제공합니다. 또한, `시각적 차트`로 건강 데이터를 직관적으로 파악할 수 있으며, 챗봇을 통해 `개인 맞춤형 식단 피드백`을 제공함으로써 사용자 경험을 향상시키고자 합니다. 이 프로젝트는 사용자들이 보다 효과적으로 건강을 유지하고 개선할 수 있도록 돕는 것을 목표로 합니다.

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
   - `OPENAI API` 를 활용해 사용자의 식단 데이터를 기반으로 프롬프트를 생성합니다.
   - 챗봇이 개인 맞춤형 피드백을 제공합니다.

### [프로젝트 일정]

![프로젝트 일정](https://github.com/gyulls2/Foomee/blob/main/public/images/readme/schedule.png?raw=true)

## 2. 기술스택 및 개발환경

- 코어: `Next.js`, `Typescript`
- Style: `tailwindCSS`
- 통신: `FetchAPI`
- 상태관리: `Zustand`
- 빌드 및 배포: `AWS EC2`, `Vercel`, `Github Actions`
- 기타 라이브러리: `nivo chart`, `next-auth`, `react-hook-form`, `react-calendar`, `moment`, `react-spinners`, `swiper`, `react-markdown`
- Formatter: `eslint`, `prettier`
- 패키지 관리: `pnpm`
- API: [공공데이터포털 | 영양성분 데이터 🔗](https://www.data.go.kr/data/15100064/standard.do#/tab_layer_open), `OPENAI API`
- DB: `MongoDB`

## **3. User Flow**

![FESP2 project figjam.png](https://github.com/gyulls2/Foomee/blob/main/public/images/readme/userflow.png)

## 4. UI 구성 요소

![UI PREVIEW.png](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fbfb5a48f-115e-4757-a1dd-1b668428a1fa%2Ff8192b44-1349-4035-8072-336960fad9f5%2FUI_PREVIEW.png?table=block&id=5bc26696-67ec-43c6-9b22-69dd173e58df&spaceId=bfb5a48f-115e-4757-a1dd-1b668428a1fa&width=2000&userId=20a52541-f6a7-4160-bec8-f1855dc5f692&cache=v2)

## 5. 핵심 기능 및 코드

### 5-1. ChatGPT 프롬프트 생성

- 사용자의 식단 데이터를 입력받아, 이를 분석하는 데 적합한 프롬프트를 생성하고, OpenAI의 gpt-4o-mini 모델을 이용해 분석 결과를 제공합니다.

chatAction.ts

```tsx
// 프롬프트 생성
const newPrompt = `오늘 내가 먹은 식단을 분석해줘! 식단은 ${result} 이야. 결과에서 식단 요약은 간단하게 음식명만 표시하고, 영양성분 계산은 제외해줘.`;

('use server');

import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatResponse(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            '당신은 영양 전문가입니다. 주어진 식단을 분석하여 영양 성분, 균형, 건강에 대한 평가를 제공하고, 필요할 경우 개선 사항을 제시하세요. 답변은 한국어로 제공하세요.',
        },
        { role: 'user', content: prompt },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching from OpenAI:', error);
  }
}
```

### 5-2. **자동 빌드 및 배포(CI/CD)**

- GitHub Actions를 사용하여 코드가 메인 브랜치에 푸시될 때 자동으로 빌드하고 `AWS EC2`에 배포되는 CI/CD 파이프라인을 구현했습니다.

.github/workflows/depoly.yml

```yaml
name: Deploy Next.js to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20'

      - name: Install pnpm
        run: |
          curl -L https://github.com/pnpm/pnpm/releases/download/v7.18.1/pnpm-linux-x64 -o /usr/local/bin/pnpm
          chmod +x /usr/local/bin/pnpm

      - name: Install dependencies
        run: pnpm install

      - name: Build Next.js app
        env:
          NEXT_PUBLIC_API_SERVER: ${{ secrets.NEXT_PUBLIC_API_SERVER }}
          NEXT_PUBLIC_DELAY: ${{ secrets.NEXT_PUBLIC_DELAY }}
          NEXT_PUBLIC_LIMIT: ${{ secrets.NEXT_PUBLIC_LIMIT }}
          NEXT_PUBLIC_TRIAL_EMAIL: ${{ secrets.NEXT_PUBLIC_TRIAL_EMAIL }}
          NEXT_PUBLIC_TRIAL_PW: ${{ secrets.NEXT_PUBLIC_TRIAL_PW }}
          NEXT_PUBLIC_API_KEY: ${{ secrets.NEXT_NEXT_PUBLIC_API_KEY }}
          NEXT_PUBLIC_CLIENT_ID: ${{ secrets.NEXT_PUBLIC_CLIENT_ID }}

        run: pnpm run build

      - name: Add EC2 to known hosts
        run: |
          mkdir -p ~/.ssh
          ssh-keyscan -H ${{ secrets.EC2_HOST }} >> ~/.ssh/known_hosts

      - name: Compress build folder
        run: tar -czf next-app.tar.gz .next package.json node_modules public

      - name: Copy files to EC2
        env:
          EC2_HOST: ${{ secrets.EC2_HOST }}
          EC2_USER: ${{ secrets.EC2_USER }}
          EC2_KEY: ${{ secrets.EC2_KEY }}
        run: |
          echo "${{ secrets.EC2_KEY }}" > ec2_key.pem
          chmod 600 ec2_key.pem
          scp -i ec2_key.pem next-app.tar.gz ${{ secrets.EC2_USER }}@${{ secrets.EC2_HOST }}:/home/${{ secrets.EC2_USER }}/

      - name: Deploy on EC2
        env:
          NEXTAUTH_SECRET: ${{ secrets.NEXTAUTH_SECRET }}
          NEXTAUTH_URL: ${{ secrets.NEXTAUTH_URL }}
          AUTH_TRUST_HOST: ${{ secrets.AUTH_TRUST_HOST }}
          OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}
          AUTH_GITHUB_CLIENT_ID: ${{ secrets.AUTH_GITHUB_CLIENT_ID }}
          AUTH_GITHUB_CLIENT_SECRET: ${{ secrets.AUTH_GITHUB_CLIENT_SECRET }}
          GOOGLE_CLIENT_ID: ${{ secrets.GOOGLE_CLIENT_ID }}
          GOOGLE_CLIENT_SECRET: ${{ secrets.GOOGLE_CLIENT_SECRET }}
          NAVER_CLIENT_ID: ${{ secrets.NAVER_CLIENT_ID }}
          NAVER_CLIENT_SECRET: ${{ secrets.NAVER_CLIENT_SECRET }}
          KAKAO_CLIENT_ID: ${{ secrets.KAKAO_CLIENT_ID }}
          KAKAO_CLIENT_SECRET: ${{ secrets.KAKAO_CLIENT_SECRET }}
          KAKAO_REDIRECT_URI: ${{ secrets.KAKAO_REDIRECT_URI }}
        run: |
          ssh -i ec2_key.pem ${{ secrets.EC2_USER }}@${{ secrets.EC2_HOST }} << 'EOF'
          cd /home/${{ secrets.EC2_USER }}
          tar -xzf next-app.tar.gz
          pnpm install --production
          echo "NEXTAUTH_SECRET=${{ secrets.NEXTAUTH_SECRET }}" >> .env
          echo "NEXTAUTH_URL=${{ secrets.NEXTAUTH_URL }}" >> .env
          echo "AUTH_TRUST_HOST=${{ secrets.AUTH_TRUST_HOST }}" >> .env
          echo "OPENAI_API_KEY=${{ secrets.OPENAI_API_KEY }}" >> .env
          echo "AUTH_GITHUB_CLIENT_ID=${{ secrets.AUTH_GITHUB_CLIENT_ID }}" >> .env
          echo "AUTH_GITHUB_CLIENT_SECRET=${{ secrets.AUTH_GITHUB_CLIENT_SECRET }}" >> .env
          echo "GOOGLE_CLIENT_ID=${{ secrets.GOOGLE_CLIENT_ID }}" >> .env
          echo "GOOGLE_CLIENT_SECRET=${{ secrets.GOOGLE_CLIENT_SECRET }}" >> .env
          echo "NAVER_CLIENT_ID=${{ secrets.NAVER_CLIENT_ID }}" >> .env
          echo "NAVER_CLIENT_SECRET=${{ secrets.NAVER_CLIENT_SECRET }}" >> .env
          echo "KAKAO_CLIENT_ID=${{ secrets.KAKAO_CLIENT_ID }}" >> .env
          echo "KAKAO_CLIENT_SECRET=${{ secrets.KAKAO_CLIENT_SECRET }}" >> .env
          echo "KAKAO_REDIRECT_URI=${{ secrets.KAKAO_REDIRECT_URI }}" >> .env
          sudo npm install -g pm2
          pm2 stop all || true
          pm2 start npm --name "foomee-app" -- run start
          pm2 save
          EOF
```

### 5-3. Swiper 라이브러리를 활용한 무한히 과거로 가는 차트 생성

`추가 예정`

### 5-4. 무한스크롤 커스텀 훅

- 모바일 사용자의 경험을 개선하기 위해, 페이지네이션 대신 무한 스크롤 기능을 구현하여 사용자의 편의성을 높였습니다.
- `Intersection Observer API`를 활용하여 스크롤 이벤트로 인한 성능 저하를 방지하고, 부드러운 무한 스크롤 경험을 제공합니다.

useInfiniteScroll.ts

```tsx
import { useEffect, useRef, useCallback } from 'react';

interface UseInfiniteScrollProps {
  hasMore: boolean;
  loadMore: () => void;
}

const useInfiniteScroll = ({ hasMore, loadMore }: UseInfiniteScrollProps) => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        loadMore();
      }
    },
    [hasMore, loadMore],
  );

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver);
    if (lastElementRef.current) {
      observerRef.current.observe(lastElementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  return { lastElementRef };
};

export default useInfiniteScroll;
```

## 6. 트러블슈팅

### 6-1. NextAuth 네이버 소셜 로그인 **`expires_in` Type Error**

NextAuth v5를 사용하여 네이버 소셜 로그인을 구현하는 과정에서 `expires_in` 필드의 타입 오류로 인해 `OperationProcessingError`가 발생했습니다.
네이버의 OAuth2.0 응답에서 `expires_in` 값이 공식 문서와 달리 문자열로 반환되는 문제였습니다.
OAuth2.0 스펙에 따르면 `expires_in` 필드는 숫자형이어야 하지만, 네이버는 이 부분을 문자열로 반환하고 있었고, 이로 인해 NextAuth에서 이를 처리하는 데 문제가 생겼습니다.

문제 해결을 위해 네이버 개발자 포럼에서 관련 오류에 대한 네이버의 답변을 확인했습니다.
네이버 측은 현재 OAuth2.0 스펙과 다르게 동작하고 있음을 인정하면서도, 기존 스펙을 수정하기는 어렵다는 입장을 밝혔습니다.
![스크린샷 2024-08-28 오전 2.12.22.png](https://github.com/gyulls2/Foomee/blob/main/public/images/readme/naver.png?raw=true)

문제를 해결하기 위해 `expires_in` 필드가 문자열 타입이어도 문제없이 처리할 수 있는 forked 버전의 `oauth4webapi` 패키지를 사용했습니다.
이를 위해 `pnpm`을 사용하여 `oauth4webapi` 패키지를 오버라이드했습니다.

```tsx
// package.json
...
"pnpm": {
  "overrides": {
    "oauth4webapi": "npm:@jacobkim/oauth4webapi@^2.10.4"
  }
}
```

이 설정을 통해 네이버의 비표준 응답을 처리할 수 있는 커스터마이즈된 `oauth4webapi` 패키지를 사용할 수 있었습니다.
이를 통해 NextAuth에서 네이버 로그인을 구현할 수 있었고, 추가적으로 `pnpm`을 도입하면서 패키지를 더욱 효율적으로 관리할 수 있었습니다.

## 7. Branch 전략

**main - develop - feature**

- **main** : 프로덕션용 브랜치 (배포용)
- **develop** : 통합 및 테스트용 브랜치 (기능 병합)
- **feat/이슈번호-기능** : 기능별 작업용 브랜치

### 커밋 컨벤션

| keyword  | description                                       |
| -------- | ------------------------------------------------- |
| FEAT     | 새로운 기능 추가                                  |
| FIX      | 버그 수정                                         |
| DOCS     | 문서 작업                                         |
| DELETE   | 기능이 삭제될 때                                  |
| STYLE    | 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우 |
| CHORE    | 빌드 업무 수정, 패키지 매니저 수정                |
| DESIGN   | CSS 등 사용자 UI 디자인 변경                      |
| REFACTOR | 코드 리팩토링                                     |
| TEST     | 테스트                                            |
| INIT     | 프로젝트 초기 생성                                |
| RENAME   | 파일 혹은 폴더명을 수정하거나 옮기는 작업         |
| REMOVE   | 파일을 삭제하는 작업만 수행한 경우                |

## 8. 문서

[🖥️ 개발일지](https://www.notion.so/f7f2ffc731f8401a828acdbb30cdd068?pvs=21)

[📋 기능 명세서](https://www.notion.so/ba15e11fcd5c46debc8de60e295ac50a?pvs=21)

[🎨 Figma | 와이어프레임](https://www.figma.com/design/LmQzCnWpU99RaJEYYiVJiC/FESP2-project-figma?node-id=2-2&t=zQu8JNTBubhipiXF-1)

[🎨 Figma | 디자인](https://www.figma.com/design/LmQzCnWpU99RaJEYYiVJiC/FESP2-project-figma?node-id=2-3&t=zQu8JNTBubhipiXF-1)

[🎨 Figma | 프로토타입](https://www.figma.com/design/LmQzCnWpU99RaJEYYiVJiC/FESP2-project-figma?node-id=0-1&t=zQu8JNTBubhipiXF-1)

## 9. User Test

- 구글 폼을 이용한 사용자 피드백 수집
- [https://forms.gle/6RnAgbz5A2LDZHvS8](https://forms.gle/6RnAgbz5A2LDZHvS8)

<!-- <details>
  <summary>사용자 피드백</summary>

![KakaoTalk_Snapshot_20240827_235227.png](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fbfb5a48f-115e-4757-a1dd-1b668428a1fa%2F07105c06-9151-46a0-b04c-b7dd21f3b28e%2FKakaoTalk_Snapshot_20240828_003023.png?table=block&id=94291dd8-9714-4bb6-92db-a56fb136b336&spaceId=bfb5a48f-115e-4757-a1dd-1b668428a1fa&width=2000&userId=20a52541-f6a7-4160-bec8-f1855dc5f692&cache=v2)

![KakaoTalk_Snapshot_20240828_003023.png](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fbfb5a48f-115e-4757-a1dd-1b668428a1fa%2F4bd00f34-3998-43f7-9b71-8001b8665a95%2FKakaoTalk_Snapshot_20240828_003005.png?table=block&id=6cd6409d-41ea-458f-9453-88e6bab230f2&spaceId=bfb5a48f-115e-4757-a1dd-1b668428a1fa&width=2000&userId=20a52541-f6a7-4160-bec8-f1855dc5f692&cache=v2)

![KakaoTalk_Snapshot_20240828_003005.png](https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fbfb5a48f-115e-4757-a1dd-1b668428a1fa%2F34d0a4d7-1c3f-47b5-ba3f-48a669acf855%2FKakaoTalk_Snapshot_20240827_235227.png?table=block&id=2cc8b7da-b088-44ee-a52f-0f7deb022f19&spaceId=bfb5a48f-115e-4757-a1dd-1b668428a1fa&width=2000&userId=20a52541-f6a7-4160-bec8-f1855dc5f692&cache=v2)

</details> -->

## 10. 회고

### [개발 과정에서의 노력]

이번 프로젝트는 개인 프로젝트임에도 불구하고, 최대한 팀 프로젝트처럼 체계적으로 진행하고자 노력했습니다.
Eslint와 Prettier 설정을 통해 코드 스타일을 일관되게 유지하고, GitHub의 Issue, PR 템플릿, Git의 Commit 템플릿을 활용하여 코드 변경 사항을 명확하게 기록하고 추적할 수 있도록 했습니다.
또한, 개발 과정을 체계적으로 문서화하여, 다른 사람이 프로젝트를 이해하고 커뮤니케이션 할 수 있도록 신경써서 작업을 진행했습니다.

프론트엔드의 역할은 사용자가 고민하지 않고 쓸 수 있는 경험을 구현하는 것이라고 생각합니다.
이번 프로젝트를 진행하면서 사용자가 고민하지 않고 직관적으로 사용할 수 있는 기능과 화면을 구현하기 위해 고민했습니다.

### [리팩토링 계획]

- 우선순위가 낮은 기능의 구현
- 유저 테스트 결과를 기반으로 모바일 최적화 및 사용자 경험 개선
- AI 분석 기능 확장: 주간 및 월간 레포트 작성 기능 추가
- 독자적인 영양성분 DB 구축: 사용자가 직접 영양성분 입력하는 기능, 음식 검색 최적화

### [후기]

평소에 관심이 많았던 헬스케어 분야의 앱을 기획부터 제작까지 직접 진행하면서, 프로젝트에 더 큰 애정을 가지고 임할 수 있었습니다. 혼자서 프로젝트를 진행하다 보니, 주어진 기간 내에 완성할 수 있을지에 대한 압박감이 있었습니다. 하지만 기간 내에 기획, 디자인, 개발의 한 사이클을 무사히 마칠 수 있어서 한 단계 성장하는 계기가 된 것 같습니다. 특히, 이전에는 시도하지 못했던 AI와 같은 기술들을 적용해 볼 수 있었던 점이 매우 즐거웠습니다. 앞으로 리팩토링 과정을 통해 더욱 완성도 높은 서비스를 만들어 나가고 싶습니다.
