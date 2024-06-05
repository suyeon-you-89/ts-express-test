# ts-express-test

- node
- express
- docker

how to run this project

if you install mongodb desktop, can use dockerfile

$NODE_ENV=local npm run dev

- docker-compose

* 컨테이너 생성 및 삭제
  docker-compose --env-file <env_file> up
  docker-compose down --rmi local <- 연관된 이미지 삭제

* docker mongodb shell 실행
  docker exec -it <NAME OR ID> mongosh -u user_name
