pipeline {
  agent any
    stages {
        stage('build') { 
          steps {
            // sh '''npm install --registry=https://registry.npm.taobao.org --unsafe-perm'''
            sh '''/root/node-js/node-v14.18.3-linux-x64/bin/n 14.18.3'''
            sh '''yarn install'''
            sh '''yarn build'''
          }
        }
        stage('push') {
          steps {
                sh '''ssh root@121.89.210.252 "rm -rf /www/server/nginx/html/Document_platform"'''
                sh '''scp -r dist/ root@121.89.210.252:/www/server/nginx/html/'''
                sh '''ssh root@121.89.210.252 "mv /www/server/nginx/html/dist /www/server/nginx/html/Document_platform"'''
          }
        }
    }
}