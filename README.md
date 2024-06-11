# ts-express-test

- node
- express
- docker

## pre

> npm init -y or yarn init -y

> npm install or yarn install

## how to run this project

### with npm

> $ NODE_ENV=local npm run local

### with docker

- standalone

  - install: mongodb
    > $NODE_ENV=local npm run dev

- use docker compose
  - pre install: docker

* 컨테이너 확인
  > docker ps
* 이미지 확인
  > docker images
* 컨테이너 생성 및 삭제

  > docker-compose --env-file <env_file> up

  > docker-compose down --rmi local <- 연관된 이미지 삭제

* docker mongodb shell 실행

  > docker exec -it \<NAME OR ID> mongosh -u user_name

* docker log 확인

  > docker logs -t -f \<NAMe or ID>
