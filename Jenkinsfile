def getHost(){
    def remote = [:]
    remote.name = 'my-agileteam-document'
    remote.host = BUILD_IP
    remote.user = 'root'
    remote.port = 22
    remote.password = 'xatz@123'
    remote.allowAnyHosts = true
    return remote
}
pipeline {
  agent any
    environment{
        def server = ''
        def BUILD_NUMBER ="${env.BUILD_NUMBER}"
        def JOB_NAME ="${env.JOB_NAME}"
        def DIST_DIR ="/www/server/nginx/html"
        def BUILD_IP ="121.89.210.252"
        def BUILD_ENV ="master"
        server = getHost()
    }
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
                sh '''rm -rf Document_platform'''
                sh '''mv dist Document_platform'''
                sshPut remote: server, from: 'Document_platform', into: DIST_DIR
          }
        }
    }
}