pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/shaziyakhann/CareerBridge.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test || true'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t careerbridge:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker stop careerbridge || true'
                sh 'docker rm careerbridge || true'
                sh 'docker run -d --name careerbridge -p 3000:3000 careerbridge:latest'
            }
        }
    }

    post {
        success {
            echo 'CareerBridge deployed successfully!'
        }

        failure {
            echo 'CareerBridge pipeline failed!'
        }
    }
}