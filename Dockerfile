FROM node:10.16.3-alpine AS build-env

ENV TIME_ZONE=Asia/Shanghai

# 使用阿里alpine镜像源
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories

RUN \
  mkdir -p /data/nodejs/huoxin-docs \
  && apk add --no-cache tzdata \
  && echo "${TIME_ZONE}" > /etc/timezone \
  && ln -sf /usr/share/zoneinfo/${TIME_ZONE} /etc/localtime

WORKDIR /data/nodejs/huoxin-docs

COPY package.json /data/nodejs/huoxin-docs

#RUN npm i

RUN npm i --registry=https://registry.npm.taobao.org

COPY . /data/nodejs/huoxin-docs

#EXPOSE 4000

RUN npm run build

#CMD npm run server
# 运行阶段
FROM nginx

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY --from=build-env /data/nodejs/huoxin-docs/public /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
