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
                    app = docker.build("jenkins_rigup_frontend")
                }
            }
        }
        stage('Push docker images to registry hub docker') {
            steps {
                echo 'Push docker image'
                script {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'credential_docker', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                        sh "sudo docker login -p $PASSWORD -u $USERNAME registry.address"
                    }
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
                withKubeConfig([credentialId: 'credential-kube-config', serverUrl: 'https://130.211.245.181']) {
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