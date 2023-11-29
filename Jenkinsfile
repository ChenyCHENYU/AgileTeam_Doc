pipeline {
  agent any
    stages {
        stage('build') { 
          steps {
            script {
                echo '*****当前nodejs环境是V16.13.2*****'
                nodejs('nodejs-16.13.2') {
                sh '''npm install -g yarn'''
                sh '''yarn config set registry https://registry.npmmirror.com'''
                sh '''yarn install'''
                sh '''yarn build'''
                }
              }
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
