# react_seminar_3week_server

리액트 세미나용 서버입니다.

## API 명세

| 메소드 | URI                | 기능                                    |
| :----: | ------------------ | --------------------------------------- |
|  GET   | /api/todos         | 투두 리스트를 조회합니다.               |
|  GET   | /api/todos/:id     | 투두 아이디를 이용해 하나만 조회합니다. |
|  POST  | /api/todos/:id     | 투두 하나를 등록합니다.                 |
| PATCH  | /api/todos/:id     | 투두 하나를 수정합니다.                 |
| DELETE | /api/todos/:id     | 투두 하나를 지웁니다.                   |
|  POST  | /api/auth/register | 사용자를 등록합니다.                    |
|  POST  | /api/auth/login    | 로그인처리합니다.                       |
|  GET   | /api/auth/check    | 로그인 상태인지 체크합니다.             |
|  POST  | /api/auth/logout   | 로그아웃 처리합니다.                    |
