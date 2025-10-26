# yum配置镜像源

```bash
# 备份源文件
mv /etc/yum.repos.d/CentOS-Base.repo  /etc/yum.repos.d/CentOS-Base.repo.backup

# 下载阿里的替换
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```





# Docker配置





## 一些数据库配置

```bash
# mongodb
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v /data/mongodb:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=root \
  -e MONGO_INITDB_ROOT_PASSWORD=123456 \
  mongo --bind_ip_all


# redis
docker run -d \
  --name myredis \
  -p 6379:6379 \
  -e REDIS_PASSWORD=123456 \
  redis:latest \
  redis-server --requirepass 123456

# etcd

```

