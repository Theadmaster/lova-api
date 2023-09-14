FROM node:18

# 工作目录
WORKDIR /usr/scr/app

# 复制目录下的package文件 到工作陌目录
COPY package.json ./

# 执行 npm install
RUN npm install

# 将本目录下所有文件复制到目标目录
COPY . .

# 容器内端口
EXPOSE 3000

# 命令执行
CMD ["npm", "run", "start"]
