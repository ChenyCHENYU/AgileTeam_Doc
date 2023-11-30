pipeline {
  agent any
    environment{
        def TARGET_SERVER="${server_ip}"
    }
    stages {
        stage('编译web工程代码') {
          steps {
            nodejs('nodejs-20.10.0') {
                sh '''npm install -g yarn'''
                sh '''yarn config set registry https://registry.npmmirror.com'''
                sh '''yarn install'''
                sh '''yarn build'''
                }
            }
        }
    }
    
        stage('SSH') {
            steps {
                script {
                    def remote = [:]
                    remote.name = 'root'
                    remote.host = "${TARGET_SERVER}"
                    remote.allowAnyHosts = true
                withCredentials([usernamePassword(credentialsId: 'ssh-gw', passwordVariable: 'password', usernameVariable: 'username')]) {
                    remote.user = "${username}"
                    remote.password = "${password}"
                }
                sh 'cd ${WORKSPACE}'
                sh 'rm -rf Document_platform'
                sh 'mv dist Document_platform'
                sshRemove remote: remote, path: "/www/server/nginx/html/Document_platform"
                sshPut remote: remote, from: 'Document_platform', into: "/www/server/nginx/html"
            }
        }
    }
}

