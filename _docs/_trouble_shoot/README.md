# 문제상황 해결

- [Node 버전 올려주기](#node-버전-올려주기)
- [Delete `cr` eslint prettier/prettier module](#delete-cr-eslint-prettierprettier-module)

------

## Node 버전 올려주기
![Image](https://github.com/user-attachments/assets/30b3104f-5b02-4227-9951-9b735d7de4a2)
- 패키지는 Node.js 20.11.1 이상의 버전을 필요로 하지만, 현재 20.9.0을 사용하고 있어 경고가 표시됨
    - `^6.11.0` : 6.11.0 이상이나 7.0.0 미만
    - `>= 1.13.0` : 1.13.0 이상

<details>
<summary><i>Node.js nvm으로 특정 버전 설치</i></summary>

![Image](https://github.com/user-attachments/assets/c699afe1-03a5-432e-be43-08e59f9fd664)

![Image](https://github.com/user-attachments/assets/e3994f3c-c773-4658-a010-152d86cd5a9c)

</details>

## Delete `cr` eslint prettier/prettier module 

![Image](https://github.com/user-attachments/assets/2f818165-90f4-4141-9744-ea43ef5a572b)

### 1. .prettierrc 파일
```
{
  "endOfLine": "auto"
}
```

### 2. `.eslintrc.js` 파일
```
rules: {
  'prettier/prettier': ['error', { endOfLine: 'auto' }],
}
```
- 이후 ctrl + s 로 저장하면 해결됨