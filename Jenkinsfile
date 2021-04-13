pipeline {
    agent any

    environment {
        DOCKER_TAG = getDockerTag()
        CI = false
    }

    stages {
        stage('Install') {
            steps {
                echo 'Install NPM'
                sh 'npm install'
            }
        }
        stage('Build rigup app') {
            steps {
                echo 'Build rigup app frontend'
                sh 'npm run build'
            }
        }
        stage('Build docker images') {
            steps {
                echo 'Build docker image'
                script {
                    app = docker.build("abitsugar/jenkins_rigup_frontend")
                }
            }
        }
        stage('Push docker images to registry hub docker') {
            steps {
                echo 'Push docker image'
                script {
                    docker.withRegistry("https://registry.hub.docker.com", "credential_docker") {
                        app.push("${DOCKER_TAG}")
                        app.push("latest")
                    }
                }
            }
        }
        stage('deploy app to kubernetes cluster'){
            steps {
                sh "chmod +x changeTag.sh"
                sh "./changeTag.sh ${DOCKER_TAG}"
                withKubeConfig([credentialsId: 'credential-kube-config', serverUrl: 'https://104.199.234.129']) {
                    sh 'kubectl apply -f deployment-frontend.k8s.yaml'
                }
            }
        }
    }
}

def getDockerTag(){
  def tag = sh script: "git rev-parse HEAD", returnStdout: true
  return tag    
}